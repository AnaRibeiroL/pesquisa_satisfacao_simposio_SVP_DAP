import { SurveyFormData, SurveyResponseRecord } from '../types';

const STORAGE_KEY = 'dap_simposio_2026_responses_v2';
const DRAFT_KEY = 'dap_simposio_2026_draft';

// URL do Web App (Google Apps Script) que grava as respostas na planilha central.
// Defina em .env (VITE_SHEETS_URL) ou no workflow de deploy. Ver planilha/LEIA-ME.md
const SHEETS_URL: string = (import.meta.env.VITE_SHEETS_URL as string | undefined) ?? '';

export const StorageService = {
  getResponses(): SurveyResponseRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async fetchServerResponses(): Promise<SurveyResponseRecord[]> {
    // Sem planilha configurada (ex.: GitHub Pages puro), usa só o armazenamento local
    if (!SHEETS_URL) return this.getResponses();
    try {
      const res = await fetch(SHEETS_URL);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const local = this.getResponses();
          const merged = new Map<string, SurveyResponseRecord>();
          [...json.data, ...local].forEach((r: SurveyResponseRecord) => merged.set(r.id, r));
          const list = Array.from(merged.values()).sort(
            (x, y) => new Date(y.submittedAt).getTime() - new Date(x.submittedAt).getTime()
          );
          localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          return list;
        }
      }
    } catch (err) {
      console.warn('Planilha inacessível, usando armazenamento local:', err);
    }
    return this.getResponses();
  },

  saveResponse(formData: SurveyFormData): SurveyResponseRecord {
    const responses = this.getResponses();
    const sequence = (responses.length + 1).toString().padStart(4, '0');
    const newRecord: SurveyResponseRecord = {
      ...formData,
      id: `resp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      protocolNumber: `DAP-2026-${sequence}`,
      submittedAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...responses];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    this.clearDraft();

    // Envia para a planilha central (Google Sheets) quando configurada
    if (SHEETS_URL) {
      // Todas as respostas em texto vão para a planilha em MAIÚSCULAS
      const paraPlanilha = Object.fromEntries(
        Object.entries(newRecord).map(([k, v]) =>
          [k, typeof v === 'string' && k !== 'id' && k !== 'submittedAt' ? v.toUpperCase() : v]
        )
      );
      fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(paraPlanilha),
      }).catch((err) => console.warn('Não foi possível enviar para a planilha:', err));
    }

    return newRecord;
  },

  getDraft(): Partial<SurveyFormData> | null {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      return draft ? JSON.parse(draft) : null;
    } catch {
      return null;
    }
  },

  saveDraft(data: Partial<SurveyFormData>): void {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      // Ignorar erros de quota
    }
  },

  clearDraft(): void {
    localStorage.removeItem(DRAFT_KEY);
  },

  clearAllResponses(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },

  exportToCsv(responses: SurveyResponseRecord[]): void {
    if (!responses.length) return;

    const headers = [
      'Protocolo',
      'Data/Hora',
      'Nome do Participante',
      'Posto/Graduação',
      'OM/Origem',
      'Região Militar',
      'Tempo de Atuação',
      'Primeira Participação',
      'Período Realização (1-5)',
      'Duração (1-5)',
      'Infraestrutura Auditório (1-5)',
      'Deslocamento HT/Evento (1-5)',
      'Recepção e Credenciamento (1-5)',
      'Alimentação/Coffee Break (1-5)',
      'Conforto e Audiovisual (1-5)',
      'Tempos Palestras (1-5)',
      'Relevância Temas (1-5)',
      'Qualidade Palestras (1-5)',
      'Espaço para Dúvidas (1-5)',
      'Clareza Normas e Sistemas (1-5)',
      'Material de Apoio (1-5)',
      'Avaliação Geral (1-5)',
      'Integração Seções/DAP (1-5)',
      'Aplicabilidade na OM (1-5)',
      'Cumprimento Horários (1-5)',
      'Comentários Gerais',
      'Pontos Fortes',
      'Sugestões Melhoria',
      'Sugestões Temas 2027',
      'Boas Práticas Compartilhadas',
      'Sugestões de Oficinas',
    ];

    const escapeCsv = (str: unknown) => {
      const s = String(str ?? '').toUpperCase().replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = responses.map((r) => [
      escapeCsv(r.protocolNumber),
      escapeCsv(new Date(r.submittedAt).toLocaleString('pt-BR')),
      escapeCsv(r.nomeParticipante),
      escapeCsv(r.postoGraduacaoCargo),
      escapeCsv(r.omRmOrigem),
      escapeCsv(r.regiaoMilitar),
      escapeCsv(r.tempoAtuacao),
      escapeCsv(r.primeiraParticipacao),
      r.periodoRealizacao,
      r.duracaoSimposio,
      r.organizacaoInfraestrutura,
      r.deslocamentoHotelEvento,
      r.apoioRecepcaoCredenciamento,
      r.refeicoesCoffeeBreak,
      r.confortoAudioVisual,
      r.temposInstrucoesPalestras,
      r.relevanciaTemas,
      r.qualidadeTecnicaDidatica,
      r.espacoDebatesDuvidas,
      r.clarezaNormasSistemas,
      r.qualidadeMaterialApoio,
      r.avaliacaoGeralExpectativas,
      r.contribuicaoIntegracao,
      r.aplicabilidadePraticaOM,
      r.cumprimentoHorarios,
      escapeCsv(r.comentariosGerais),
      escapeCsv(r.pontosFortes),
      escapeCsv(r.sugestoesMelhoria),
      escapeCsv(r.sugestoesTemas2027),
      escapeCsv(r.boasPraticasCompartilhar),
      escapeCsv(r.sugestoesOficinas),
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Pesquisa_Satisfacao_Simposio_DAP_2026_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportToJson(responses: SurveyResponseRecord[]): void {
    const blob = new Blob([JSON.stringify(responses, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Pesquisa_Satisfacao_Simposio_DAP_2026_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
