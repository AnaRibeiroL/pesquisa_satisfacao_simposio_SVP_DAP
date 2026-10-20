// Web App que grava as respostas da pesquisa na planilha (aba "Respostas").
// Instruções em planilha/LEIA-ME.md
// Se o script foi criado em script.google.com (projeto solto), cole aqui o ID da planilha
// (trecho da URL entre /d/ e /edit). Se foi criado por Extensões > Apps Script, deixe vazio.
const ID_PLANILHA = '175jomsSVHzicyil-Pdj_eNYRLpE0Vtvxsd8bL8QW5bw';

const CAMPOS = [
  ['protocolNumber', 'Protocolo'], ['submittedAt', 'Data/Hora'],
  ['nomeParticipante', 'Nome do Participante'], ['postoGraduacaoCargo', 'Posto/Graduação'], ['omRmOrigem', 'OM/Origem'],
  ['regiaoMilitar', 'Região Militar'], ['tempoAtuacao', 'Tempo de Atuação'],
  ['primeiraParticipacao', 'Primeira Participação'],
  ['periodoRealizacao', 'Período Realização (1-5)'], ['duracaoSimposio', 'Duração (1-5)'],
  ['organizacaoInfraestrutura', 'Infraestrutura Auditório (1-5)'],
  ['deslocamentoHotelEvento', 'Deslocamento HT/Evento (1-5)'],
  ['apoioRecepcaoCredenciamento', 'Recepção e Credenciamento (1-5)'],
  ['refeicoesCoffeeBreak', 'Alimentação/Coffee Break (1-5)'],
  ['confortoAudioVisual', 'Conforto e Audiovisual (1-5)'],
  ['temposInstrucoesPalestras', 'Tempos Palestras (1-5)'],
  ['relevanciaTemas', 'Relevância Temas (1-5)'],
  ['qualidadeTecnicaDidatica', 'Qualidade Palestras (1-5)'],
  ['espacoDebatesDuvidas', 'Espaço para Dúvidas (1-5)'],
  ['clarezaNormasSistemas', 'Clareza Normas e Sistemas (1-5)'],
  ['qualidadeMaterialApoio', 'Material de Apoio (1-5)'],
  ['avaliacaoGeralExpectativas', 'Avaliação Geral (1-5)'],
  ['contribuicaoIntegracao', 'Integração Seções/DAP (1-5)'],
  ['aplicabilidadePraticaOM', 'Aplicabilidade na OM (1-5)'],
  ['cumprimentoHorarios', 'Cumprimento Horários (1-5)'],
  ['comentariosGerais', 'Comentários Gerais'], ['pontosFortes', 'Pontos Fortes'],
  ['sugestoesMelhoria', 'Sugestões Melhoria'], ['sugestoesTemas2027', 'Sugestões Temas 2027'],
  ['boasPraticasCompartilhar', 'Boas Práticas Compartilhadas'],
  ['sugestoesOficinas', 'Sugestões de Oficinas'],
  ['id', 'ID'],
];

function aba_() {
  const ss = ID_PLANILHA ? SpreadsheetApp.openById(ID_PLANILHA) : SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Respostas') || ss.insertSheet('Respostas');
  if (sh.getLastRow() === 0) {
    sh.appendRow(CAMPOS.map(c => c[1]));
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const r = JSON.parse(e.postData.contents);
    const sh = aba_();
    const idCol = CAMPOS.length;
    const ids = sh.getLastRow() > 1 ? sh.getRange(2, idCol, sh.getLastRow() - 1, 1).getValues().flat() : [];
    if (ids.indexOf(r.id) === -1) sh.appendRow(CAMPOS.map(c => r[c[0]] === undefined ? '' : r[c[0]]));
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lido pelo painel de resultados
function doGet() {
  const sh = aba_();
  const linhas = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, CAMPOS.length).getValues() : [];
  const data = linhas.map(l => {
    const o = {};
    CAMPOS.forEach((c, i) => { o[c[0]] = l[i] instanceof Date ? l[i].toISOString() : l[i]; });
    return o;
  });
  return ContentService.createTextOutput(JSON.stringify({ success: true, data: data })).setMimeType(ContentService.MimeType.JSON);
}
