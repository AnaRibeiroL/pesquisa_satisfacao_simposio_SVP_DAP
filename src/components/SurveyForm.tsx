import React, { useState, useEffect } from 'react';
import {
  SurveyFormData,
  INITIAL_FORM_DATA,
  REGIOES_MILITARES,
  POSTOS_GRADUACOES,
} from '../types';
import { LikertScale } from './LikertScale';
import { StorageService } from '../services/storage';

interface SurveyFormProps {
  onSubmitSuccess: (data: SurveyFormData, protocol: string) => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<SurveyFormData>(() => {
    const draft = StorageService.getDraft();
    return draft ? { ...INITIAL_FORM_DATA, ...draft } : INITIAL_FORM_DATA;
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'stepper' | 'continuous'>('stepper');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});
  const [draftSavedAlert, setDraftSavedAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Autosave rascunho
  useEffect(() => {
    StorageService.saveDraft(formData);
  }, [formData]);

  const updateField = <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleManualSaveDraft = () => {
    StorageService.saveDraft(formData);
    setDraftSavedAlert(true);
    setTimeout(() => setDraftSavedAlert(false), 2500);
  };

  const handleResetForm = () => {
    if (window.confirm('Deseja realmente limpar todas as respostas digitadas neste formulário?')) {
      StorageService.clearDraft();
      setFormData(INITIAL_FORM_DATA);
      setActiveStep(1);
      setValidationErrors({});
    }
  };

  // Cálculo de progresso
  const totalScales = 15;
  const answeredScales = [
    formData.periodoRealizacao,
    formData.duracaoSimposio,
    formData.organizacaoInfraestrutura,
    formData.deslocamentoHotelEvento,
    formData.apoioRecepcaoCredenciamento,
    formData.refeicoesCoffeeBreak,
    formData.confortoAudioVisual,
    formData.temposInstrucoesPalestras,
    formData.relevanciaTemas,
    formData.qualidadeTecnicaDidatica,
    formData.espacoDebatesDuvidas,
    formData.clarezaNormasSistemas,
    formData.qualidadeMaterialApoio,
    formData.avaliacaoGeralExpectativas,
    formData.contribuicaoIntegracao,
    formData.aplicabilidadePraticaOM,
    formData.cumprimentoHorarios,
  ].filter((v) => v > 0).length;

  const progressPercent = Math.min(100, Math.round((answeredScales / 17) * 100));

  // Validação por etapa
  const validateStep = (step: number): boolean => {
    const errors: { [key: string]: boolean } = {};

    if (step === 2) {
      if (!formData.periodoRealizacao) errors.periodoRealizacao = true;
      if (!formData.duracaoSimposio) errors.duracaoSimposio = true;
      if (!formData.organizacaoInfraestrutura) errors.organizacaoInfraestrutura = true;
      if (!formData.deslocamentoHotelEvento) errors.deslocamentoHotelEvento = true;
      if (!formData.apoioRecepcaoCredenciamento) errors.apoioRecepcaoCredenciamento = true;
      if (!formData.refeicoesCoffeeBreak) errors.refeicoesCoffeeBreak = true;
      if (!formData.confortoAudioVisual) errors.confortoAudioVisual = true;
    }

    if (step === 3) {
      if (!formData.temposInstrucoesPalestras) errors.temposInstrucoesPalestras = true;
      if (!formData.relevanciaTemas) errors.relevanciaTemas = true;
      if (!formData.qualidadeTecnicaDidatica) errors.qualidadeTecnicaDidatica = true;
      if (!formData.espacoDebatesDuvidas) errors.espacoDebatesDuvidas = true;
      if (!formData.clarezaNormasSistemas) errors.clarezaNormasSistemas = true;
      if (!formData.qualidadeMaterialApoio) errors.qualidadeMaterialApoio = true;
    }

    if (step === 4) {
      if (!formData.avaliacaoGeralExpectativas) errors.avaliacaoGeralExpectativas = true;
      if (!formData.contribuicaoIntegracao) errors.contribuicaoIntegracao = true;
      if (!formData.aplicabilidadePraticaOM) errors.aplicabilidadePraticaOM = true;
      if (!formData.cumprimentoHorarios) errors.cumprimentoHorarios = true;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(5, prev + 1));
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar todas as etapas
    const errors: { [key: string]: boolean } = {};
    if (!formData.periodoRealizacao) errors.periodoRealizacao = true;
    if (!formData.duracaoSimposio) errors.duracaoSimposio = true;
    if (!formData.organizacaoInfraestrutura) errors.organizacaoInfraestrutura = true;
    if (!formData.deslocamentoHotelEvento) errors.deslocamentoHotelEvento = true;
    if (!formData.apoioRecepcaoCredenciamento) errors.apoioRecepcaoCredenciamento = true;
    if (!formData.refeicoesCoffeeBreak) errors.refeicoesCoffeeBreak = true;
    if (!formData.confortoAudioVisual) errors.confortoAudioVisual = true;

    if (!formData.temposInstrucoesPalestras) errors.temposInstrucoesPalestras = true;
    if (!formData.relevanciaTemas) errors.relevanciaTemas = true;
    if (!formData.qualidadeTecnicaDidatica) errors.qualidadeTecnicaDidatica = true;
    if (!formData.espacoDebatesDuvidas) errors.espacoDebatesDuvidas = true;
    if (!formData.clarezaNormasSistemas) errors.clarezaNormasSistemas = true;
    if (!formData.qualidadeMaterialApoio) errors.qualidadeMaterialApoio = true;

    if (!formData.avaliacaoGeralExpectativas) errors.avaliacaoGeralExpectativas = true;
    if (!formData.contribuicaoIntegracao) errors.contribuicaoIntegracao = true;
    if (!formData.aplicabilidadePraticaOM) errors.aplicabilidadePraticaOM = true;
    if (!formData.cumprimentoHorarios) errors.cumprimentoHorarios = true;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      alert('Atenção: Por favor, preencha todas as perguntas de avaliação (escala 1 a 5) nas Seções 2, 3 e 4 antes de enviar.');
      // Ir para a primeira seção com erro
      if (
        errors.periodoRealizacao ||
        errors.duracaoSimposio ||
        errors.organizacaoInfraestrutura ||
        errors.deslocamentoHotelEvento ||
        errors.apoioRecepcaoCredenciamento ||
        errors.refeicoesCoffeeBreak ||
        errors.confortoAudioVisual
      ) {
        setActiveStep(2);
      } else if (
        errors.temposInstrucoesPalestras ||
        errors.relevanciaTemas ||
        errors.qualidadeTecnicaDidatica ||
        errors.espacoDebatesDuvidas ||
        errors.clarezaNormasSistemas ||
        errors.qualidadeMaterialApoio
      ) {
        setActiveStep(3);
      } else {
        setActiveStep(4);
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const record = StorageService.saveResponse(formData);
      setIsSubmitting(false);
      onSubmitSuccess(formData, record.protocolNumber);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Barra de Controles do Formulário e Progresso */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>Progresso das Avaliações</span>
              <span>·</span>
              <span className="text-emerald-800 font-bold">{progressPercent}% Concluído</span>
            </div>
            {/* Barra de progresso */}
            <div className="w-full sm:w-64 h-2 bg-stone-100 rounded-full mt-1.5 overflow-hidden border border-stone-200">
              <div
                className="h-full bg-emerald-700 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Seletor de Modo de Exibição */}
          <div className="flex items-center gap-2">
            <div className="flex p-0.5 bg-stone-100 rounded-lg border border-stone-200 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('stepper')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  viewMode === 'stepper'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Passo a Passo
              </button>
              <button
                type="button"
                onClick={() => setViewMode('continuous')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  viewMode === 'continuous'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Página Única
              </button>
            </div>

            <button
              type="button"
              onClick={handleManualSaveDraft}
              title="Salvar Rascunho no Navegador"
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              Salvar Rascunho
            </button>

            <button
              type="button"
              onClick={handleResetForm}
              title="Limpar respostas"
              className="px-2.5 py-1.5 text-xs text-stone-500 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Limpar
            </button>
          </div>
        </div>

        {draftSavedAlert && (
          <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center justify-between">
            <span>✓ Respostas salvas automaticamente no seu navegador como rascunho.</span>
          </div>
        )}

        {/* Stepper Tabs (quando em modo stepper) */}
        {viewMode === 'stepper' && (
          <div className="mt-5 pt-4 border-t border-stone-200 grid grid-cols-5 gap-1.5 text-center">
            {[
              { num: 1, label: 'Identificação' },
              { num: 2, label: 'Logística' },
              { num: 3, label: 'Programação' },
              { num: 4, label: 'Opinião Geral' },
              { num: 5, label: 'Considerações' },
            ].map((tab) => {
              const isCurrent = activeStep === tab.num;
              const isPast = activeStep > tab.num;
              return (
                <button
                  key={tab.num}
                  type="button"
                  onClick={() => {
                    if (tab.num < activeStep || validateStep(activeStep)) {
                      setActiveStep(tab.num);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }
                  }}
                  className={`py-2 px-1 rounded-lg text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-xs'
                      : isPast
                      ? 'bg-stone-100 text-stone-800 hover:bg-stone-200 font-medium'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span className="block font-mono text-[11px]">0{tab.num}</span>
                  <span className="truncate hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SEÇÃO 1: Identificação (Opcional) */}
      {(viewMode === 'continuous' || activeStep === 1) && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
              Seção 01 de 05
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              Identificação & Perfil Institucional
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Esta seção é opcional, garantindo o sigilo caso prefira responder de forma anônima.
            </p>
          </div>

          <div className="space-y-6">
            {/* Nome do Participante */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                Nome do Participante
                <span className="text-xs font-normal text-stone-500 ml-2">(Opcional)</span>
              </label>
              <input
                type="text"
                value={formData.nomeParticipante}
                onChange={(e) => updateField('nomeParticipante', e.target.value)}
                placeholder="Seu nome (pode deixar em branco)"
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 text-stone-900 text-sm"
              />
            </div>

            {/* Posto / Graduação */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                Posto / Graduação ou Cargo
                <span className="text-xs font-normal text-stone-500 ml-2">(Resposta curta / Opcional)</span>
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.postoGraduacaoCargo}
                  onChange={(e) => updateField('postoGraduacaoCargo', e.target.value)}
                  placeholder="Ex: Major, Tenente-Coronel, 1º Sargento, Servidor Civil..."
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 text-stone-900 text-sm"
                />
                {/* Sugestões rápidas */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-stone-500 py-0.5">Sugestões rápidas:</span>
                  {['Ten Cel', 'Major', 'Capitão', '1º Tenente', 'Subtenente', '1º Sargento', 'Servidor Civil'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => updateField('postoGraduacaoCargo', p)}
                      className="text-xs px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* OM / RM de Origem */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                Organização Militar (OM) / RM de Origem
                <span className="text-xs font-normal text-stone-500 ml-2">(Resposta curta / Opcional)</span>
              </label>
              <input
                type="text"
                value={formData.omRmOrigem}
                onChange={(e) => updateField('omRmOrigem', e.target.value)}
                placeholder="Ex: Seção de Veteranos e Pensionistas da 3ª RM, SVP/11ª RM, Cmdo 7ª RM..."
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 text-stone-900 text-sm"
              />
            </div>

            {/* Pergunta Adicional 1: Região Militar Vinculada */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                Região Militar de Enquadramento
                <span className="text-xs font-normal text-stone-500 ml-2">(Selecione sua RM para consolidação regional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {REGIOES_MILITARES.slice(0, 12).map((rm) => {
                  const isSelected = formData.regiaoMilitar === rm.id;
                  return (
                    <button
                      key={rm.id}
                      type="button"
                      onClick={() => updateField('regiaoMilitar', isSelected ? '' : rm.id)}
                      className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-900 text-amber-300 border-emerald-900 font-bold shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                      title={`${rm.name} - ${rm.states}`}
                    >
                      <div className="text-xs font-bold font-mono">{rm.id}</div>
                      <div className="text-[10px] text-stone-500 truncate mt-0.5">
                        {rm.hq.split(' - ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-2">
                {REGIOES_MILITARES.slice(12).map((rm) => {
                  const isSelected = formData.regiaoMilitar === rm.id;
                  return (
                    <button
                      key={rm.id}
                      type="button"
                      onClick={() => updateField('regiaoMilitar', isSelected ? '' : rm.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-900 text-amber-300 border-emerald-900 font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {rm.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pergunta Adicional 2: Tempo de Atuação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                  Tempo de atuação no atendimento a Veteranos e Pensionistas:
                </label>
                <select
                  value={formData.tempoAtuacao}
                  onChange={(e) => updateField('tempoAtuacao', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">Selecione uma opção...</option>
                  <option value="Menos de 1 ano">Menos de 1 ano</option>
                  <option value="1 a 3 anos">1 a 3 anos</option>
                  <option value="3 a 5 anos">3 a 5 anos</option>
                  <option value="Mais de 5 anos">Mais de 5 anos</option>
                </select>
              </div>

              {/* Pergunta Adicional 3: Primeira Participação */}
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                  É a sua primeira participação no Simpósio DAP?
                </label>
                <div className="flex items-center gap-3 mt-1">
                  <label className="flex items-center gap-2 text-sm text-stone-800 cursor-pointer p-2 rounded-lg border border-stone-200 hover:bg-stone-50 flex-1">
                    <input
                      type="radio"
                      name="primeiraParticipacao"
                      checked={formData.primeiraParticipacao === 'sim'}
                      onChange={() => updateField('primeiraParticipacao', 'sim')}
                      className="text-emerald-700 focus:ring-emerald-700"
                    />
                    <span>Sim, 1ª vez</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-stone-800 cursor-pointer p-2 rounded-lg border border-stone-200 hover:bg-stone-50 flex-1">
                    <input
                      type="radio"
                      name="primeiraParticipacao"
                      checked={formData.primeiraParticipacao === 'nao'}
                      onChange={() => updateField('primeiraParticipacao', 'nao')}
                      className="text-emerald-700 focus:ring-emerald-700"
                    />
                    <span>Não, já participei antes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'stepper' && (
            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Avançar para Seção 2: Logística →
              </button>
            </div>
          )}
        </section>
      )}

      {/* SEÇÃO 2: Avaliação da Logística e Infraestrutura */}
      {(viewMode === 'continuous' || activeStep === 2) && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
              Seção 02 de 05
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              Avaliação da Logística e Infraestrutura
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Escala linear de 1 a 5, onde <strong>1 = Insuficiente/Ruim</strong> e <strong>5 = Excelente</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <LikertScale
              label="1. Período em que o Simpósio foi realizado"
              description="Adequação da data (19 a 22 de Outubro de 2026) considerando o calendário militar e as demandas operacionais das Seções."
              value={formData.periodoRealizacao}
              onChange={(val) => updateField('periodoRealizacao', val)}
              hasError={validationErrors.periodoRealizacao}
            />

            <LikertScale
              label="2. Duração do Simpósio"
              description="Extensão da carga horária ao longo dos dias do evento para cumprimento dos objetivos propostos."
              value={formData.duracaoSimposio}
              onChange={(val) => updateField('duracaoSimposio', val)}
              hasError={validationErrors.duracaoSimposio}
            />

            <LikertScale
              label="3. Organização geral e infraestrutura (Auditório CMP)"
              description="Espaço físico, acessibilidade, climatização, limpeza e sinalização no Auditório do Comando Militar do Planalto."
              value={formData.organizacaoInfraestrutura}
              onChange={(val) => updateField('organizacaoInfraestrutura', val)}
              hasError={validationErrors.organizacaoInfraestrutura}
            />

            <LikertScale
              label="4. Deslocamento do Hotel de Trânsito (HT) para o Local do Evento"
              description="Pontualidade, rotas e logística de transporte disponibilizada entre o Hotel de Trânsito e o Auditório CMP."
              value={formData.deslocamentoHotelEvento}
              onChange={(val) => updateField('deslocamentoHotelEvento', val)}
              hasError={validationErrors.deslocamentoHotelEvento}
            />

            {/* Perguntas Adicionais da Seção 2 */}
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
                Aspectos Complementares de Apoio e Alimentação
              </span>

              <div className="space-y-4">
                <LikertScale
                  label="5. Recepção, credenciamento e apoio da equipe organizadora"
                  description="Presteza, orientação inicial na chegada e suporte técnico-administrativo durante o evento."
                  value={formData.apoioRecepcaoCredenciamento}
                  onChange={(val) => updateField('apoioRecepcaoCredenciamento', val)}
                  hasError={validationErrors.apoioRecepcaoCredenciamento}
                />

                <LikertScale
                  label="6. Qualidade dos Coffee Breaks e refeições de confraternização"
                  description="Variedade, pontualidade nos intervalos e espaço para integração entre os participantes."
                  value={formData.refeicoesCoffeeBreak}
                  onChange={(val) => updateField('refeicoesCoffeeBreak', val)}
                  hasError={validationErrors.refeicoesCoffeeBreak}
                />

                <LikertScale
                  label="7. Recursos audiovisuais, projeção e acústica das instalações"
                  description="Nitidez dos telões, microfonia, conectividade e visualização das apresentações na plenária."
                  value={formData.confortoAudioVisual}
                  onChange={(val) => updateField('confortoAudioVisual', val)}
                  hasError={validationErrors.confortoAudioVisual}
                />
              </div>
            </div>
          </div>

          {viewMode === 'stepper' && (
            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                ← Voltar
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Avançar para Seção 3: Programação →
              </button>
            </div>
          )}
        </section>
      )}

      {/* SEÇÃO 3: Avaliação da Programação e Instruções */}
      {(viewMode === 'continuous' || activeStep === 3) && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
              Seção 03 de 05
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              Avaliação da Programação e Instruções
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Escala linear de 1 a 5, onde <strong>1 = Insuficiente/Ruim</strong> e <strong>5 = Excelente</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <LikertScale
              label="1. Tempos destinados às instruções e palestras"
              description="Equilíbrio entre a carga expositiva, tempo de fala e pausas previstas no cronograma oficial."
              value={formData.temposInstrucoesPalestras}
              onChange={(val) => updateField('temposInstrucoesPalestras', val)}
              hasError={validationErrors.temposInstrucoesPalestras}
            />

            <LikertScale
              label="2. Relevância dos temas abordados na programação"
              description="Pertinência dos assuntos tratados frente às rotinas operacionais e desafios diários de atendimento das Seções de Veteranos e Pensionistas."
              value={formData.relevanciaTemas}
              onChange={(val) => updateField('relevanciaTemas', val)}
              hasError={validationErrors.relevanciaTemas}
            />

            <LikertScale
              label="3. Qualidade técnica e didática das palestras apresentadas"
              description="Domínio do conteúdo pelos expositores, clareza na transmissão dos conhecimentos e profundidade técnica."
              value={formData.qualidadeTecnicaDidatica}
              onChange={(val) => updateField('qualidadeTecnicaDidatica', val)}
              hasError={validationErrors.qualidadeTecnicaDidatica}
            />

            {/* Perguntas Adicionais da Seção 3 */}
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
                Interação e Conteúdo Técnico Complementar
              </span>

              <div className="space-y-4">
                <LikertScale
                  label="4. Espaço destinado para esclarecimento de dúvidas e debates com a plenária"
                  description="Oportunidade para manifestação das delegações regionais, perguntas aos instrutores e discussão de casos concretos."
                  value={formData.espacoDebatesDuvidas}
                  onChange={(val) => updateField('espacoDebatesDuvidas', val)}
                  hasError={validationErrors.espacoDebatesDuvidas}
                />

                <LikertScale
                  label="5. Clareza nas orientações sobre legislação, normas e sistemas informatizados de pensões"
                  description="Orientações normativas, alinhamentos jurídicos e atualizações das ferramentas e sistemas de gestão da DAP."
                  value={formData.clarezaNormasSistemas}
                  onChange={(val) => updateField('clarezaNormasSistemas', val)}
                  hasError={validationErrors.clarezaNormasSistemas}
                />

                <LikertScale
                  label="6. Qualidade técnica e utilidade dos materiais de apoio / apresentações disponibilizadas"
                  description="Adequação das apostilas, manuais, lâminas digitais e repositório de documentos distribuídos às equipes."
                  value={formData.qualidadeMaterialApoio}
                  onChange={(val) => updateField('qualidadeMaterialApoio', val)}
                  hasError={validationErrors.qualidadeMaterialApoio}
                />
              </div>
            </div>
          </div>

          {viewMode === 'stepper' && (
            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                ← Voltar
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Avançar para Seção 4: Opinião Geral →
              </button>
            </div>
          )}
        </section>
      )}

      {/* SEÇÃO 4: Opinião em Caráter Geral sobre o Simpósio */}
      {(viewMode === 'continuous' || activeStep === 4) && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
              Seção 04 de 05
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              Opinião em Caráter Geral sobre o Simpósio
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Avaliação holística do evento, integração interinstitucional e observações gerais.
            </p>
          </div>

          <div className="space-y-4">
            <LikertScale
              label="1. Avaliação geral do evento em relação às expectativas institucionais"
              description="Considerando a totalidade do simpósio, o evento alcançou os objetivos institucionais e atendeu às suas expectativas?"
              value={formData.avaliacaoGeralExpectativas}
              onChange={(val) => updateField('avaliacaoGeralExpectativas', val)}
              hasError={validationErrors.avaliacaoGeralExpectativas}
            />

            <LikertScale
              label="2. Contribuição do Simpósio para a integração entre as Seções e a Diretoria (DAP)"
              description="Aproximação, fortalecimento de canais de comunicação direta e sinergia entre o órgão central e as Regiões Militares."
              value={formData.contribuicaoIntegracao}
              onChange={(val) => updateField('contribuicaoIntegracao', val)}
              hasError={validationErrors.contribuicaoIntegracao}
            />

            {/* Perguntas Adicionais da Seção 4 */}
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
                Impacto Operacional na sua Unidade de Origem
              </span>

              <div className="space-y-4">
                <LikertScale
                  label="3. Grau de aplicabilidade prática dos conhecimentos adquiridos no retorno à sua OM/RM"
                  description="Capacidade de aplicar imediatamente as instruções e fluxos na rotina de concessão e atendimento a pensionistas."
                  value={formData.aplicabilidadePraticaOM}
                  onChange={(val) => updateField('aplicabilidadePraticaOM', val)}
                  hasError={validationErrors.aplicabilidadePraticaOM}
                />

                <LikertScale
                  label="4. Cumprimento dos horários e pontualidade do cronograma previsto"
                  description="Respeito aos horários de abertura, início das palestras, intervalos e encerramento dos trabalhos."
                  value={formData.cumprimentoHorarios}
                  onChange={(val) => updateField('cumprimentoHorarios', val)}
                  hasError={validationErrors.cumprimentoHorarios}
                />
              </div>
            </div>

            {/* Comentários Gerais */}
            <div className="pt-4 border-t border-stone-200">
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                Comentários gerais sobre o evento
                <span className="text-xs font-normal text-stone-500 ml-2">(Texto longo / Parágrafo)</span>
              </label>
              <textarea
                rows={4}
                value={formData.comentariosGerais}
                onChange={(e) => updateField('comentariosGerais', e.target.value)}
                placeholder="Insira suas impressões gerais, agradecimentos ou observações adicionais sobre o Simpósio DAP 2026..."
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm leading-relaxed"
              />
            </div>
          </div>

          {viewMode === 'stepper' && (
            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                ← Voltar
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Avançar para Seção 5: Considerações Finais →
              </button>
            </div>
          )}
        </section>
      )}

      {/* SEÇÃO 5: Considerações Finais e Contribuições */}
      {(viewMode === 'continuous' || activeStep === 5) && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
              Seção 05 de 05
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              Considerações Finais e Contribuições
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Suas contribuições qualitativas serão minuciosamente analisadas pela equipe de planejamento da DAP para o Simpósio de 2027.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                1. Quais foram os principais pontos fortes do Simpósio DAP 2026?
                <span className="text-xs font-normal text-stone-500 ml-2">(Texto longo / Parágrafo)</span>
              </label>
              <textarea
                rows={3}
                value={formData.pontosFortes}
                onChange={(e) => updateField('pontosFortes', e.target.value)}
                placeholder="Destaque as palestras mais marcantes, organização, soluções apresentadas ou momentos de destaque..."
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                2. Quais sugestões de melhoria são apontadas para os próximos eventos de Simpósio?
                <span className="text-xs font-normal text-stone-500 ml-2">(Texto longo / Parágrafo)</span>
              </label>
              <textarea
                rows={3}
                value={formData.sugestoesMelhoria}
                onChange={(e) => updateField('sugestoesMelhoria', e.target.value)}
                placeholder="Aponte aspectos logísticos, tempo de instrução, infraestrutura ou dinâmicas que podem ser aprimorados..."
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                3. Quais sugestões de temas devem ser abordados no Simpósio de 2027?
                <span className="text-xs font-normal text-stone-500 ml-2">(Texto longo / Parágrafo)</span>
              </label>
              <textarea
                rows={3}
                value={formData.sugestoesTemas2027}
                onChange={(e) => updateField('sugestoesTemas2027', e.target.value)}
                placeholder="Assuntos de legislação, perícias médicas, atendimento humanizado, novidades tecnológicas, etc..."
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm"
              />
            </div>

            {/* Perguntas Adicionais da Seção 5 */}
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
                Compartilhamento de Boas Práticas Regionais
              </span>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                    4. Alguma boa prática ou inovação da sua RM que você gostaria de apresentar em uma próxima edição?
                    <span className="text-xs font-normal text-stone-500 ml-2">(Ex: atendimento itinerante, triagem digital, etc.)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.boasPraticasCompartilhar}
                    onChange={(e) => updateField('boasPraticasCompartilhar', e.target.value)}
                    placeholder="Descreva brevemente uma iniciativa que obteve êxito na sua Região Militar..."
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-1.5">
                    5. Sugestões de oficinas práticas ou estudos de caso para os próximos encontros:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.sugestoesOficinas}
                    onChange={(e) => updateField('sugestoesOficinas', e.target.value)}
                    placeholder="Ex: Simulação prática de reversão de pensão, oficina de atendimento a idosos vulneráveis..."
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {viewMode === 'stepper' ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                ← Voltar
              </button>
            ) : <div />}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleManualSaveDraft}
                className="px-4 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Salvar Rascunho
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-amber-300 font-bold text-sm sm:text-base rounded-xl shadow-lg ring-2 ring-amber-400/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Registrando Resposta...' : 'Enviar Pesquisa de Satisfação'}
              </button>
            </div>
          </div>
        </section>
      )}
    </form>
  );
};
