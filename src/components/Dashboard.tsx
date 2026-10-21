import React, { useState } from 'react';
import { SurveyResponseRecord, REGIOES_MILITARES } from '../types';
import { StorageService } from '../services/storage';

interface DashboardProps {
  responses: SurveyResponseRecord[];
  onRefresh: () => void;
  onNewSurvey: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  responses,
  onRefresh,
  onNewSurvey,
}) => {
  const [selectedRmFilter, setSelectedRmFilter] = useState<string>('all');
  const [selectedDetail, setSelectedDetail] = useState<SurveyResponseRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'kpi' | 'topics' | 'records'>('kpi');

  // Filtros
  const filteredResponses = responses.filter((r) => {
    if (selectedRmFilter === 'all') return true;
    return r.regiaoMilitar === selectedRmFilter;
  });

  // Cálculos estatísticos
  const count = filteredResponses.length;

  const average = (fn: (r: SurveyResponseRecord) => number) => {
    if (!count) return 0;
    const sum = filteredResponses.reduce((acc, r) => acc + (fn(r) || 0), 0);
    return Number((sum / count).toFixed(2));
  };

  const overallAvg = average((r) => r.avaliacaoGeralExpectativas);
  const logisticaAvg = average((r) =>
    (r.periodoRealizacao +
      r.duracaoSimposio +
      r.organizacaoInfraestrutura +
      r.deslocamentoHotelEvento +
      (r.apoioRecepcaoCredenciamento || 5) +
      (r.refeicoesCoffeeBreak || 5) +
      (r.confortoAudioVisual || 5)) / 7
  );

  const programacaoAvg = average((r) =>
    (r.temposInstrucoesPalestras +
      r.relevanciaTemas +
      r.qualidadeTecnicaDidatica +
      (r.espacoDebatesDuvidas || 5) +
      (r.clarezaNormasSistemas || 5) +
      (r.qualidadeMaterialApoio || 5)) / 6
  );

  const integracaoAvg = average((r) => r.contribuicaoIntegracao);
  const aplicabilidadeAvg = average((r) => r.aplicabilidadePraticaOM || 5);

  // Médias detalhadas por item
  const detailItems = [
    { label: 'Período do Simpósio', value: average((r) => r.periodoRealizacao), category: 'Logística' },
    { label: 'Duração do Evento', value: average((r) => r.duracaoSimposio), category: 'Logística' },
    { label: 'Infraestrutura Auditório CMP', value: average((r) => r.organizacaoInfraestrutura), category: 'Logística' },
    { label: 'Deslocamento HT → CMP', value: average((r) => r.deslocamentoHotelEvento), category: 'Logística' },
    { label: 'Recepção e Credenciamento', value: average((r) => r.apoioRecepcaoCredenciamento || 5), category: 'Logística' },
    { label: 'Coffee Break & Refeições', value: average((r) => r.refeicoesCoffeeBreak || 5), category: 'Logística' },
    { label: 'Audiovisual & Conforto', value: average((r) => r.confortoAudioVisual || 5), category: 'Logística' },

    { label: 'Tempos das Instruções', value: average((r) => r.temposInstrucoesPalestras), category: 'Programação' },
    { label: 'Relevância dos Temas', value: average((r) => r.relevanciaTemas), category: 'Programação' },
    { label: 'Qualidade Técnica e Didática', value: average((r) => r.qualidadeTecnicaDidatica), category: 'Programação' },
    { label: 'Espaço p/ Dúvidas e Plenária', value: average((r) => r.espacoDebatesDuvidas || 5), category: 'Programação' },
    { label: 'Clareza de Normas e Sistemas', value: average((r) => r.clarezaNormasSistemas || 5), category: 'Programação' },
    { label: 'Material de Apoio e Slides', value: average((r) => r.qualidadeMaterialApoio || 5), category: 'Programação' },

    { label: 'Expectativas Institucionais', value: average((r) => r.avaliacaoGeralExpectativas), category: 'Geral' },
    { label: 'Integração Seções / DAP', value: average((r) => r.contribuicaoIntegracao), category: 'Geral' },
    { label: 'Aplicabilidade Prática na OM', value: average((r) => r.aplicabilidadePraticaOM || 5), category: 'Geral' },
    { label: 'Cumprimento de Horários', value: average((r) => r.cumprimentoHorarios || 5), category: 'Geral' },
  ];

  // Distribuição por RM
  const rmDistribution = REGIOES_MILITARES.slice(0, 12).map((rm) => {
    const rmCount = responses.filter((r) => r.regiaoMilitar === rm.id).length;
    return {
      id: rm.id,
      name: rm.name,
      count: rmCount,
    };
  });

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header do Painel */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
            <span>DAP / DGP · Órgão de Gestão</span>
            <span>·</span>
            <span>Simpósio 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Painel Executivo de Satisfação
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Consolidação das avaliações das Seções de Veteranos e Pensionistas de todo o território nacional.
          </p>
        </div>

        {/* Ações Rápidas */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => StorageService.exportToCsv(responses)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            title="Baixar planilha CSV compatível com Excel"
          >
            <span>Baixar Planilha CSV</span>
          </button>
          <button
            onClick={() => StorageService.exportToJson(responses)}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
          >
            Exportar JSON
          </button>
          <button
            onClick={onNewSurvey}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-900 transition-colors shadow-xs cursor-pointer"
          >
            + Nova Resposta
          </button>
        </div>
      </div>

      {/* Filtro e Navegação Interna */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-3 rounded-xl border border-stone-200">
        <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'kpi'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Indicadores & Médias
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sugestões Simpósio 2027
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'records'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Respostas Individuais ({count})
          </button>
        </div>

        {/* Filtro por Região Militar */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-600 font-medium">Filtrar por Região:</span>
          <select
            value={selectedRmFilter}
            onChange={(e) => setSelectedRmFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-emerald-700"
          >
            <option value="all">Todas as Regiões Militares ({responses.length})</option>
            {REGIOES_MILITARES.slice(0, 12).map((rm) => (
              <option key={rm.id} value={rm.id}>
                {rm.name} ({responses.filter((r) => r.regiaoMilitar === rm.id).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TAB 1: Indicadores & Médias */}
      {activeTab === 'kpi' && (
        <div className="space-y-8">
          {/* Grade de 4 Grandes Indicadores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
                Avaliação Geral (Expectativas)
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-900">
                  {overallAvg}
                </span>
                <span className="text-xs font-semibold text-stone-400">/ 5.0</span>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                Alinhamento com diretrizes institucionais da DAP
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
                Índice de Logística & Espaço
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-900">
                  {logisticaAvg}
                </span>
                <span className="text-xs font-semibold text-stone-400">/ 5.0</span>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                Auditório CMP, traslados, datas e refeições
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
                Programação & Conteúdo Técnico
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-900">
                  {programacaoAvg}
                </span>
                <span className="text-xs font-semibold text-stone-400">/ 5.0</span>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                Didática, relevância dos temas e material
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
                Integração Seções / DAP
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-900">
                  {integracaoAvg}
                </span>
                <span className="text-xs font-semibold text-stone-400">/ 5.0</span>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                Aproximação e aplicabilidade na rotina das OMs ({aplicabilidadeAvg}/5)
              </div>
            </div>
          </div>

          {/* Comparativo de Notas por Pergunta do Simpósio */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="border-b border-stone-200 pb-4 mb-6">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Desempenho Médio por Pergunta Avaliada (Escala 1 a 5)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Valores consolidados de {count} respostas registradas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              {detailItems.map((item) => {
                const percent = (item.value / 5) * 100;
                return (
                  <div key={item.label} className="py-2">
                    <div className="flex justify-between items-baseline text-xs mb-1">
                      <span className="font-semibold text-stone-800">
                        {item.label}
                        <span className="text-[10px] text-stone-400 ml-1.5 uppercase">
                          ({item.category})
                        </span>
                      </span>
                      <span className="font-mono font-bold text-emerald-900 text-sm">
                        {item.value} <span className="text-stone-400 text-xs">/ 5</span>
                      </span>
                    </div>
                    {/* Barra visual proporcional */}
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-emerald-800 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Participação das 12 Regiões Militares */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
              Representatividade pelas 12 Regiões Militares
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Contagem de respostas originadas de cada comando regional.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {rmDistribution.map((rm) => (
                <div
                  key={rm.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    rm.count > 0
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-stone-50 border-stone-200 opacity-60'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-emerald-950 block">
                    {rm.id}
                  </span>
                  <span className="text-xl font-mono font-bold text-stone-800 block mt-1">
                    {rm.count}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate mt-0.5">
                    respostas
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Sugestões Simpósio 2027 */}
      {activeTab === 'topics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
              Contribuições Estratégicas para o Simpósio 2027
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Compilado de temas propostos, pontos fortes destacados e boas práticas para a próxima edição.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sugestões de Temas 2027 */}
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                <h4 className="text-sm font-serif font-bold text-amber-950 mb-3 flex items-center gap-1.5">
                  <span>💡 Temas Sugeridos para 2027</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-stone-700">
                  {responses
                    .filter((r) => r.sugestoesTemas2027?.trim())
                    .slice(0, 6)
                    .map((r, i) => (
                      <li key={i} className="p-2.5 bg-white rounded-lg border border-amber-100 shadow-2xs">
                        <p className="italic text-stone-800 font-serif">"{r.sugestoesTemas2027}"</p>
                        <span className="text-[10px] text-stone-400 block mt-1">
                          {r.regiaoMilitar || 'RM não identificada'} · {r.postoGraduacaoCargo || 'Participante'}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Pontos Fortes 2026 */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                <h4 className="text-sm font-serif font-bold text-emerald-950 mb-3 flex items-center gap-1.5">
                  <span>★ Principais Pontos Fortes</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-stone-700">
                  {responses
                    .filter((r) => r.pontosFortes?.trim())
                    .slice(0, 6)
                    .map((r, i) => (
                      <li key={i} className="p-2.5 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                        <p className="text-stone-800">"{r.pontosFortes}"</p>
                        <span className="text-[10px] text-stone-400 block mt-1">
                          {r.regiaoMilitar || 'Geral'} · {r.postoGraduacaoCargo || 'Participante'}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Boas Práticas & Inovações Regionais */}
              <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200">
                <h4 className="text-sm font-serif font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                  <span>🏆 Inovações e Boas Práticas das RMs</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-stone-700">
                  {responses
                    .filter((r) => r.boasPraticasCompartilhar?.trim())
                    .slice(0, 6)
                    .map((r, i) => (
                      <li key={i} className="p-2.5 bg-white rounded-lg border border-stone-200 shadow-2xs">
                        <p className="text-stone-800">"{r.boasPraticasCompartilhar}"</p>
                        <span className="text-[10px] text-stone-400 block mt-1">
                          {r.regiaoMilitar || 'Região'} · {r.postoGraduacaoCargo || 'Participante'}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Respostas Individuais */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Lista de Registros Individuais
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Clique em uma linha para ver a íntegra dos dados e considerações enviadas.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Protocolo</th>
                  <th className="py-3 px-4">Data/Hora</th>
                  <th className="py-3 px-4">Posto / Cargo</th>
                  <th className="py-3 px-4">Região / OM</th>
                  <th className="py-3 px-4 text-center">Logística</th>
                  <th className="py-3 px-4 text-center">Programação</th>
                  <th className="py-3 px-4 text-center">Geral</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredResponses.map((r) => {
                  const logScore = (
                    (r.periodoRealizacao +
                      r.duracaoSimposio +
                      r.organizacaoInfraestrutura +
                      r.deslocamentoHotelEvento) / 4
                  ).toFixed(1);
                  const progScore = (
                    (r.temposInstrucoesPalestras +
                      r.relevanciaTemas +
                      r.qualidadeTecnicaDidatica) / 3
                  ).toFixed(1);

                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedDetail(r)}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-emerald-950">
                        {r.protocolNumber}
                      </td>
                      <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                        {new Date(r.submittedAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-800">
                        {r.nomeParticipante && <span className="block font-semibold">{r.nomeParticipante}</span>}
                        {r.postoGraduacaoCargo || (!r.nomeParticipante && <span className="text-stone-400 italic">Anônimo</span>)}
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        <span className="font-semibold text-emerald-900">{r.regiaoMilitar || '-'}</span>
                        {r.omRmOrigem && <span className="text-stone-500 block truncate max-w-xs">{r.omRmOrigem}</span>}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold">
                        {logScore}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold">
                        {progScore}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-emerald-900">
                        {r.avaliacaoGeralExpectativas}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetail(r);
                          }}
                          className="px-2.5 py-1 text-xs text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded border border-stone-200 transition-colors"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Resposta Selecionada */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-[#0c2417] p-5 text-white flex justify-between items-center border-b border-amber-500/20">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-mono">
                  {selectedDetail.protocolNumber}
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                  {selectedDetail.nomeParticipante || selectedDetail.postoGraduacaoCargo || 'Participante'} · {selectedDetail.regiaoMilitar || 'OM de Origem'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm text-stone-800">
              {/* Notas */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-900 mb-2">
                  Notas Atribuídas (1 a 5)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Período:</span>
                    <span className="font-mono font-bold text-base">{selectedDetail.periodoRealizacao} / 5</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Duração:</span>
                    <span className="font-mono font-bold text-base">{selectedDetail.duracaoSimposio} / 5</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Auditório CMP:</span>
                    <span className="font-mono font-bold text-base">{selectedDetail.organizacaoInfraestrutura} / 5</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Deslocamento HT:</span>
                    <span className="font-mono font-bold text-base">{selectedDetail.deslocamentoHotelEvento} / 5</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Qualidade Palestras:</span>
                    <span className="font-mono font-bold text-base">{selectedDetail.qualidadeTecnicaDidatica} / 5</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Avaliação Geral:</span>
                    <span className="font-mono font-bold text-base text-emerald-900">{selectedDetail.avaliacaoGeralExpectativas} / 5</span>
                  </div>
                </div>
              </div>

              {/* Textos Qualitativos */}
              {selectedDetail.comentariosGerais && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-900 mb-1">
                    Comentários Gerais:
                  </h4>
                  <p className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700 italic">
                    "{selectedDetail.comentariosGerais}"
                  </p>
                </div>
              )}

              {selectedDetail.pontosFortes && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-900 mb-1">
                    Pontos Fortes:
                  </h4>
                  <p className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700">
                    {selectedDetail.pontosFortes}
                  </p>
                </div>
              )}

              {selectedDetail.sugestoesMelhoria && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-900 mb-1">
                    Sugestões de Melhoria:
                  </h4>
                  <p className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700">
                    {selectedDetail.sugestoesMelhoria}
                  </p>
                </div>
              )}

              {selectedDetail.sugestoesTemas2027 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-900 mb-1">
                    Sugestões de Temas para 2027:
                  </h4>
                  <p className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700">
                    {selectedDetail.sugestoesTemas2027}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition-colors cursor-pointer"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
