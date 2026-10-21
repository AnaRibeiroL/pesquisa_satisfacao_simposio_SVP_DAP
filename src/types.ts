export interface SurveyFormData {
  // Seção 1: Identificação (Opcional)
  nomeParticipante: string;
  postoGraduacaoCargo: string;
  omRmOrigem: string;
  regiaoMilitar: string;
  tempoAtuacao: string;
  primeiraParticipacao: string;

  // Seção 2: Avaliação da Logística e Infraestrutura (1 a 5)
  periodoRealizacao: number;
  duracaoSimposio: number;
  organizacaoInfraestrutura: number;
  deslocamentoHotelEvento: number;
  // Perguntas extras adicionadas sobre o evento:
  apoioRecepcaoCredenciamento: number;
  refeicoesCoffeeBreak: number;
  confortoAudioVisual: number;

  // Seção 3: Avaliação da Programação e Instruções (1 a 5)
  temposInstrucoesPalestras: number;
  relevanciaTemas: number;
  qualidadeTecnicaDidatica: number;
  // Perguntas extras adicionadas sobre o evento:
  espacoDebatesDuvidas: number;
  clarezaNormasSistemas: number;
  qualidadeMaterialApoio: number;

  // Seção 4: Opinião em Caráter Geral sobre o Simpósio (1 a 5 + texto)
  avaliacaoGeralExpectativas: number;
  contribuicaoIntegracao: number;
  // Perguntas extras adicionadas sobre o evento:
  aplicabilidadePraticaOM: number;
  cumprimentoHorarios: number;
  comentariosGerais: string;

  // Seção 5: Considerações Finais e Contribuições (Texto longo)
  pontosFortes: string;
  sugestoesMelhoria: string;
  sugestoesTemas2027: string;
  // Perguntas extras adicionadas sobre o evento:
  boasPraticasCompartilhar: string;
  sugestoesOficinas: string;
}

export interface SurveyResponseRecord extends SurveyFormData {
  id: string;
  protocolNumber: string;
  submittedAt: string;
}

export interface MilitaryRegion {
  id: string;
  name: string;
  states: string;
  hq: string;
}

export const REGIOES_MILITARES: MilitaryRegion[] = [
  { id: '1ª RM', name: '1ª Região Militar', states: 'Rio de Janeiro e Espírito Santo', hq: 'Rio de Janeiro - RJ' },
  { id: '2ª RM', name: '2ª Região Militar', states: 'São Paulo', hq: 'São Paulo - SP' },
  { id: '3ª RM', name: '3ª Região Militar', states: 'Rio Grande do Sul', hq: 'Porto Alegre - RS' },
  { id: '4ª RM', name: '4ª Região Militar', states: 'Minas Gerais', hq: 'Belo Horizonte - MG' },
  { id: '5ª RM', name: '5ª Região Militar', states: 'Paraná e Santa Catarina', hq: 'Curitiba - PR' },
  { id: '6ª RM', name: '6ª Região Militar', states: 'Bahia e Sergipe', hq: 'Salvador - BA' },
  { id: '7ª RM', name: '7ª Região Militar', states: 'Pernambuco, Alagoas, Paraíba e Rio Grande do Norte', hq: 'Recife - PE' },
  { id: '8ª RM', name: '8ª Região Militar', states: 'Pará, Amapá e Maranhão', hq: 'Belém - PA' },
  { id: '9ª RM', name: '9ª Região Militar', states: 'Mato Grosso do Sul e Mato Grosso', hq: 'Campo Grande - MS' },
  { id: '10ª RM', name: '10ª Região Militar', states: 'Ceará e Piauí', hq: 'Fortaleza - CE' },
  { id: '11ª RM', name: '11ª Região Militar', states: 'Distrito Federal, Goiás, Tocantins e Triângulo Mineiro', hq: 'Brasília - DF' },
  { id: '12ª RM', name: '12ª Região Militar', states: 'Amazonas, Acre, Roraima e Rondônia', hq: 'Manaus - AM' },
  { id: 'DAP / DGP', name: 'Diretoria de Assistência ao Pessoal / DGP', states: 'Órgão Central', hq: 'Brasília - DF' },
  { id: 'Outra', name: 'Outra Organização Militar', states: 'Demais OMs', hq: 'Brasil' },
];

export const ORGAOS_ORIGEM = [
  'AGU',
  'TCU',
  'CIE',
  'CPEx',
  'CCIEx',
  'CGCFEx',
  'AMAM',
  'AD/1',
  'DAP / DGP',
  'CONJUR-EB',
  'MD',
  'FAB',
  'MARINHA',
];

export const POSTOS_GRADUACOES = [
  'General de Exército',
  'General de Divisão',
  'General de Brigada',
  'Coronel',
  'Tenente-Coronel',
  'Major',
  'Capitão',
  '1º Tenente',
  '2º Tenente',
  'Aspirante a Oficial',
  'Subtenente',
  '1º Sargento',
  '2º Sargento',
  '3º Sargento',
  'Servidor Civil (AsseJur / Técnico)',
  'Outro',
];

export const INITIAL_FORM_DATA: SurveyFormData = {
  nomeParticipante: '',
  postoGraduacaoCargo: '',
  omRmOrigem: '',
  regiaoMilitar: '',
  tempoAtuacao: '',
  primeiraParticipacao: '',

  periodoRealizacao: 0,
  duracaoSimposio: 0,
  organizacaoInfraestrutura: 0,
  deslocamentoHotelEvento: 0,
  apoioRecepcaoCredenciamento: 0,
  refeicoesCoffeeBreak: 0,
  confortoAudioVisual: 0,

  temposInstrucoesPalestras: 0,
  relevanciaTemas: 0,
  qualidadeTecnicaDidatica: 0,
  espacoDebatesDuvidas: 0,
  clarezaNormasSistemas: 0,
  qualidadeMaterialApoio: 0,

  avaliacaoGeralExpectativas: 0,
  contribuicaoIntegracao: 0,
  aplicabilidadePraticaOM: 0,
  cumprimentoHorarios: 0,
  comentariosGerais: '',

  pontosFortes: '',
  sugestoesMelhoria: '',
  sugestoesTemas2027: '',
  boasPraticasCompartilhar: '',
  sugestoesOficinas: '',
};
