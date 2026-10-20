import { SurveyFormData, SurveyResponseRecord } from '../types';

const STORAGE_KEY = 'dap_simposio_2026_responses';
const DRAFT_KEY = 'dap_simposio_2026_draft';

// Amostras realistas de respostas para demonstrar o painel analítico
export const SAMPLE_RESPONSES: SurveyResponseRecord[] = [
  {
    id: 'resp-1',
    protocolNumber: 'DAP-2026-0814',
    submittedAt: '2026-10-20T10:15:00.000Z',
    postoGraduacaoCargo: 'Major',
    omRmOrigem: 'Seção de Veteranos e Pensionistas da 3ª RM',
    regiaoMilitar: '3ª RM',
    tempoAtuacao: '3 a 5 anos',
    primeiraParticipacao: 'nao',
    periodoRealizacao: 5,
    duracaoSimposio: 4,
    organizacaoInfraestrutura: 5,
    deslocamentoHotelEvento: 5,
    apoioRecepcaoCredenciamento: 5,
    refeicoesCoffeeBreak: 5,
    confortoAudioVisual: 5,
    temposInstrucoesPalestras: 4,
    relevanciaTemas: 5,
    qualidadeTecnicaDidatica: 5,
    espacoDebatesDuvidas: 4,
    clarezaNormasSistemas: 5,
    qualidadeMaterialApoio: 5,
    avaliacaoGeralExpectativas: 5,
    contribuicaoIntegracao: 5,
    aplicabilidadePraticaOM: 5,
    cumprimentoHorarios: 5,
    comentariosGerais: 'Excelente iniciativa da DAP. A integração presencial com as outras Seções de Veteranos permitiu alinhar entendimentos sobre os novos decretos e unificar o atendimento.',
    pontosFortes: 'Didática das palestras técnicas, clareza sobre o Sistema de Gestão de Pensionistas e o acolhimento impecável no Auditório CMP.',
    sugestoesMelhoria: 'Disponibilizar mais tempo para oficinas práticas com estudos de casos complexos de pensão militar.',
    sugestoesTemas2027: 'Processamento de habilitação de pensões com novos entendimentos dos Tribunais de Contas e Inteligência Artificial aplicada à triagem de processos.',
    boasPraticasCompartilhar: 'Criamos na 3ª RM um canal direto de atendimento humanizado via agendamento digital para pensionistas idosos.',
    sugestoesOficinas: 'Oficina prática de cálculo de reversão e partilha de pensão.',
  },
  {
    id: 'resp-2',
    protocolNumber: 'DAP-2026-0829',
    submittedAt: '2026-10-20T11:40:00.000Z',
    postoGraduacaoCargo: 'Capitão',
    omRmOrigem: 'SVP / 11ª RM',
    regiaoMilitar: '11ª RM',
    tempoAtuacao: '1 a 3 anos',
    primeiraParticipacao: 'sim',
    periodoRealizacao: 4,
    duracaoSimposio: 4,
    organizacaoInfraestrutura: 5,
    deslocamentoHotelEvento: 4,
    apoioRecepcaoCredenciamento: 5,
    refeicoesCoffeeBreak: 4,
    confortoAudioVisual: 5,
    temposInstrucoesPalestras: 4,
    relevanciaTemas: 5,
    qualidadeTecnicaDidatica: 5,
    espacoDebatesDuvidas: 5,
    clarezaNormasSistemas: 4,
    qualidadeMaterialApoio: 4,
    avaliacaoGeralExpectativas: 5,
    contribuicaoIntegracao: 5,
    aplicabilidadePraticaOM: 5,
    cumprimentoHorarios: 4,
    comentariosGerais: 'Primeira vez participando. Superou as expectativas. Os contatos estabelecidos com os chefes de seção de todo o Brasil facilitará muito o dia a dia.',
    pontosFortes: 'Abertura para esclarecimento de dúvidas e a presença dos diretores da DAP durante todo o evento.',
    sugestoesMelhoria: 'Envio prévio dos slides ou e-book com antecedência de 48h para leitura preliminar.',
    sugestoesTemas2027: 'Digitalização total do processo de recadastramento anual (prova de vida por biometria).',
    boasPraticasCompartilhar: 'Piloto de atendimento volante às pensionistas domiciliadas ou em asilos na guarnição.',
    sugestoesOficinas: 'Estudos práticos no ambiente de homologação dos sistemas DAP.',
  },
  {
    id: 'resp-3',
    protocolNumber: 'DAP-2026-0850',
    submittedAt: '2026-10-20T14:20:00.000Z',
    postoGraduacaoCargo: '1º Tenente',
    omRmOrigem: 'Seção de Veteranos e Pensionistas da 1ª RM',
    regiaoMilitar: '1ª RM',
    tempoAtuacao: 'Mais de 5 anos',
    primeiraParticipacao: 'nao',
    periodoRealizacao: 5,
    duracaoSimposio: 5,
    organizacaoInfraestrutura: 5,
    deslocamentoHotelEvento: 4,
    apoioRecepcaoCredenciamento: 5,
    refeicoesCoffeeBreak: 5,
    confortoAudioVisual: 5,
    temposInstrucoesPalestras: 5,
    relevanciaTemas: 5,
    qualidadeTecnicaDidatica: 5,
    espacoDebatesDuvidas: 4,
    clarezaNormasSistemas: 5,
    qualidadeMaterialApoio: 5,
    avaliacaoGeralExpectativas: 5,
    contribuicaoIntegracao: 5,
    aplicabilidadePraticaOM: 5,
    cumprimentoHorarios: 5,
    comentariosGerais: 'Parabéns à equipe organizadora da DAP. O Simpósio 2026 demonstrou grande evolução em relação ao ano passado.',
    pontosFortes: 'A qualidade dos palestrantes e o acolhimento caloroso prestado pela Diretoria aos participantes de todas as RMs.',
    sugestoesMelhoria: 'Incluir mesas-redondas temáticas divididas por complexidade de atendimento.',
    sugestoesTemas2027: 'Assistência social integrada e acolhimento psicológico de pensionistas em situação de vulnerabilidade.',
    boasPraticasCompartilhar: 'Implementação de protocolo padrão de atendimento prioritário no Rio de Janeiro.',
    sugestoesOficinas: 'Resolução colaborativa de pendências de documentação cartorária.',
  },
  {
    id: 'resp-4',
    protocolNumber: 'DAP-2026-0872',
    submittedAt: '2026-10-21T09:10:00.000Z',
    postoGraduacaoCargo: 'Subtenente',
    omRmOrigem: 'SVP / 12ª RM',
    regiaoMilitar: '12ª RM',
    tempoAtuacao: '3 a 5 anos',
    primeiraParticipacao: 'nao',
    periodoRealizacao: 4,
    duracaoSimposio: 4,
    organizacaoInfraestrutura: 5,
    deslocamentoHotelEvento: 5,
    apoioRecepcaoCredenciamento: 5,
    refeicoesCoffeeBreak: 5,
    confortoAudioVisual: 4,
    temposInstrucoesPalestras: 4,
    relevanciaTemas: 5,
    qualidadeTecnicaDidatica: 4,
    espacoDebatesDuvidas: 5,
    clarezaNormasSistemas: 4,
    qualidadeMaterialApoio: 4,
    avaliacaoGeralExpectativas: 5,
    contribuicaoIntegracao: 5,
    aplicabilidadePraticaOM: 4,
    cumprimentoHorarios: 4,
    comentariosGerais: 'Fundamental para nós da Amazônia Ocidental estarmos alinhados com as diretrizes do órgão central.',
    pontosFortes: 'Compreensão das peculiaridades regionais das guarnições especiais e de fronteira.',
    sugestoesMelhoria: 'Mais tempo para troca de experiências entre Seções de RMs distantes.',
    sugestoesTemas2027: 'Logística de atendimento em regiões remotas e suporte a pensionistas em pelotões de fronteira.',
    boasPraticasCompartilhar: 'Uso de embarcações para recadastramento em comunidades ribeirinhas no Amazonas.',
    sugestoesOficinas: 'Sistemas offline para áreas sem conectividade permanente.',
  },
  {
    id: 'resp-5',
    protocolNumber: 'DAP-2026-0895',
    submittedAt: '2026-10-21T15:30:00.000Z',
    postoGraduacaoCargo: 'Tenente-Coronel',
    omRmOrigem: 'Chefe da SVP / 2ª RM',
    regiaoMilitar: '2ª RM',
    tempoAtuacao: 'Mais de 5 anos',
    primeiraParticipacao: 'nao',
    periodoRealizacao: 5,
    duracaoSimposio: 5,
    organizacaoInfraestrutura: 5,
    deslocamentoHotelEvento: 5,
    apoioRecepcaoCredenciamento: 5,
    refeicoesCoffeeBreak: 5,
    confortoAudioVisual: 5,
    temposInstrucoesPalestras: 5,
    relevanciaTemas: 5,
    qualidadeTecnicaDidatica: 5,
    espacoDebatesDuvidas: 5,
    clarezaNormasSistemas: 5,
    qualidadeMaterialApoio: 5,
    avaliacaoGeralExpectativas: 5,
    contribuicaoIntegracao: 5,
    aplicabilidadePraticaOM: 5,
    cumprimentoHorarios: 5,
    comentariosGerais: 'Simpósio de alto nível institucional. A liderança da DAP está de parabéns pela visão estratégica voltada ao bem-estar da família militar.',
    pontosFortes: 'Sintonia entre as orientações jurídicas e o procedimento administrativo de balcão.',
    sugestoesMelhoria: 'Manter a periodicidade anual e criar um grupo de trabalho permanente entre os simpósios.',
    sugestoesTemas2027: 'Modernização da legislação de pensões e segurança jurídica nos atos concessórios.',
    boasPraticasCompartilhar: 'Central de Atendimento Telefônico com gravação e protocolo em São Paulo.',
    sugestoesOficinas: 'Auditoria preventiva de processos e conformidade com o TCU.',
  },
  {
    id: 'resp-6',
    protocolNumber: 'DAP-2026-0911',
    submittedAt: '2026-10-21T16:45:00.000Z',
    postoGraduacaoCargo: 'Servidor Civil (AsseJur / Técnico)',
    omRmOrigem: 'Assessoria Jurídica SVP / 7ª RM',
    regiaoMilitar: '7ª RM',
    tempoAtuacao: '1 a 3 anos',
    primeiraParticipacao: 'sim',
    periodoRealizacao: 4,
    duracaoSimposio: 4,
    organizacaoInfraestrutura: 5,
    deslocamentoHotelEvento: 4,
    apoioRecepcaoCredenciamento: 5,
    refeicoesCoffeeBreak: 4,
    confortoAudioVisual: 5,
    temposInstrucoesPalestras: 4,
    relevanciaTemas: 5,
    qualidadeTecnicaDidatica: 5,
    espacoDebatesDuvidas: 4,
    clarezaNormasSistemas: 4,
    qualidadeMaterialApoio: 5,
    avaliacaoGeralExpectativas: 5,
    contribuicaoIntegracao: 5,
    aplicabilidadePraticaOM: 5,
    cumprimentoHorarios: 5,
    comentariosGerais: 'Evento muito proveitoso para a assessoria jurídica das RMs. Esclareceu pontos de divergência na interpretação de pensão pós-reforma.',
    pontosFortes: 'Debate aprofundado com os instrutores e padronização dos pareceres jurídicos.',
    sugestoesMelhoria: 'Mais tempo para discussão de jurisprudência recente.',
    sugestoesTemas2027: 'Uniformização da jurisprudência do STJ e STF sobre direitos previdenciários dos militares.',
    boasPraticasCompartilhar: 'Manual simplificado de dúvidas frequentes entregue aos beneficiários na 7ª RM.',
    sugestoesOficinas: 'Estudo de minutas e pareceres padronizados.',
  }
];

export const StorageService = {
  getResponses(): SurveyResponseRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RESPONSES));
        // Sincroniza em segundo plano com o servidor
        this.syncWithServer(SAMPLE_RESPONSES);
        return SAMPLE_RESPONSES;
      }
      return JSON.parse(data);
    } catch {
      return SAMPLE_RESPONSES;
    }
  },

  async fetchServerResponses(): Promise<SurveyResponseRecord[]> {
    try {
      const res = await fetch('/api/responses');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          return json.data;
        } else if (json.success && Array.isArray(json.data) && json.data.length === 0) {
          // Se o servidor estiver vazio, popula com as amostras
          await this.syncWithServer(SAMPLE_RESPONSES);
          return SAMPLE_RESPONSES;
        }
      }
    } catch (err) {
      console.warn('Servidor inacessível, usando armazenamento local:', err);
    }
    return this.getResponses();
  },

  async syncWithServer(responses: SurveyResponseRecord[]): Promise<void> {
    try {
      await fetch('/api/responses/bulk-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses }),
      });
    } catch (err) {
      console.warn('Falha na sincronização com servidor:', err);
    }
  },

  saveResponse(formData: SurveyFormData): SurveyResponseRecord {
    const responses = this.getResponses();
    const sequence = (responses.length + 820).toString().padStart(4, '0');
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

    // Salva no servidor para que todos os organizadores e participantes vejam
    fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    }).catch((err) => console.warn('Não foi possível persistir no servidor:', err));

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

  resetToSamples(): SurveyResponseRecord[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RESPONSES));
    fetch('/api/responses/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ samples: SAMPLE_RESPONSES }),
    }).catch(() => {});
    return SAMPLE_RESPONSES;
  },

  clearAllResponses(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    fetch('/api/responses/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ samples: [] }),
    }).catch(() => {});
  },

  exportToCsv(responses: SurveyResponseRecord[]): void {
    if (!responses.length) return;

    const headers = [
      'Protocolo',
      'Data/Hora',
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
      const s = String(str ?? '').replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = responses.map((r) => [
      escapeCsv(r.protocolNumber),
      escapeCsv(new Date(r.submittedAt).toLocaleString('pt-BR')),
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
