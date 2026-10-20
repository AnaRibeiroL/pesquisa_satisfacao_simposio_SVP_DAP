import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Armazenamento em arquivo para persistência compartilhada
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getStoredResponses(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Erro ao ler responses.json:', err);
  }
  return [];
}

function saveStoredResponses(responses: any[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2), 'utf-8');
  } catch (err) {
    console.error('Erro ao salvar responses.json:', err);
  }
}

// Rotas da API de Pesquisa de Satisfação
app.get('/api/responses', (req, res) => {
  const responses = getStoredResponses();
  res.json({ success: true, data: responses });
});

app.post('/api/responses', (req, res) => {
  const newResponse = req.body;
  if (!newResponse) {
    return res.status(400).json({ success: false, error: 'Dados inválidos' });
  }

  const responses = getStoredResponses();
  // Evitar duplicidade pelo id
  const existingIdx = responses.findIndex((r) => r.id === newResponse.id);
  if (existingIdx >= 0) {
    responses[existingIdx] = newResponse;
  } else {
    responses.unshift(newResponse);
  }

  saveStoredResponses(responses);
  res.json({ success: true, data: newResponse, total: responses.length });
});

app.post('/api/responses/bulk-sync', (req, res) => {
  const { responses } = req.body;
  if (!Array.isArray(responses)) {
    return res.status(400).json({ success: false, error: 'Array esperado' });
  }

  const current = getStoredResponses();
  const currentMap = new Map(current.map((r) => [r.id, r]));

  responses.forEach((r) => {
    if (r && r.id) {
      currentMap.set(r.id, r);
    }
  });

  const merged = Array.from(currentMap.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  saveStoredResponses(merged);
  res.json({ success: true, data: merged });
});

app.post('/api/responses/reset', (req, res) => {
  const samples = req.body.samples || [];
  saveStoredResponses(samples);
  res.json({ success: true, data: samples });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Configuração do Vite em Desenvolvimento / Produção
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DAP 2026] Servidor iniciado na porta ${PORT} (modo: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
