import React from 'react';
import { SurveyFormData } from '../types';

interface SubmissionSuccessModalProps {
  protocolNumber: string;
  data: SurveyFormData;
  onReset: () => void;
  onGoToDashboard: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  protocolNumber,
  data,
  onReset,
  onGoToDashboard,
}) => {
  const currentDate = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Topo Institucional do Comprovante */}
        <div className="bg-gradient-to-r from-[#0c2417] via-[#123524] to-[#0c2417] p-6 text-white text-center border-b border-amber-500/30">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-2xl font-bold font-serif">
            ✓
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
            Comprovante Oficial de Participação
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
            Pesquisa Registrada com Sucesso!
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Simpósio da Seção de Veteranos e Pensionistas DAP 2026
          </p>
        </div>

        {/* Corpo do Comprovante */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Caixa de Protocolo */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Número de Protocolo
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-950 tracking-wider mt-1 block">
              {protocolNumber}
            </span>
            <span className="text-xs text-stone-500 mt-1 block">
              Registrado em {currentDate}
            </span>
          </div>

          {/* Resumo Institucional */}
          <div className="text-xs sm:text-sm text-stone-600 space-y-2 border-t border-b border-stone-200 py-4">
            <div className="flex justify-between">
              <span className="font-semibold text-stone-700">Posto/Graduação:</span>
              <span className="text-stone-900">{data.postoGraduacaoCargo || 'Não informado (Anônimo)'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-stone-700">OM / Origem:</span>
              <span className="text-stone-900">{data.omRmOrigem || 'Não informado'}</span>
            </div>
            {data.regiaoMilitar && (
              <div className="flex justify-between">
                <span className="font-semibold text-stone-700">Região Militar:</span>
                <span className="text-stone-900 font-medium">{data.regiaoMilitar}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-semibold text-stone-700">Avaliação Geral:</span>
              <span className="text-emerald-800 font-bold">{data.avaliacaoGeralExpectativas} / 5</span>
            </div>
          </div>

          <p className="text-xs text-stone-500 text-center leading-relaxed">
            A Diretoria de Assistência ao Pessoal (DAP) agradece a sua colaboração. Suas respostas
            contribuem diretamente para a excelência do planejamento do <strong>Simpósio DAP 2027</strong>.
          </p>

          {/* Botões de Ação */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handlePrint}
              type="button"
              className="flex-1 py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer text-center"
            >
              Imprimir / Salvar PDF
            </button>
            <button
              onClick={onGoToDashboard}
              type="button"
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer text-center"
            >
              Ver Painel Geral DAP
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={onReset}
              type="button"
              className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors cursor-pointer"
            >
              Preencher outra resposta para o Simpósio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
