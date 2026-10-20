import React from 'react';
import { REGIOES_MILITARES } from '../types';

interface AboutModalProps {
  onBackToForm: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onBackToForm }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Banner / Card principal */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
          Diretoria de Assistência ao Pessoal · DGP
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
          Simpósio de Veteranos e Pensionistas DAP 2026
        </h1>
        <p className="text-base text-stone-600 mt-2 leading-relaxed">
          Realizado de <strong>19 a 22 de outubro de 2026</strong> no histórico Auditório do Comando Militar do Planalto (CMP), em Brasília-DF, o simpósio reúne os chefes de Seção de Veteranos e Pensionistas (SVP) das doze Regiões Militares do Exército Brasileiro.
        </p>

        <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block text-sm mb-1">Objetivo Estratégico</span>
            Unificar entendimentos normativos, alinhar processos operacionais de concessão de pensões e modernizar o atendimento humanizado.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block text-sm mb-1">Local & Infraestrutura</span>
            Auditório CMP (Comando Militar do Planalto), com suporte logístico de hospedagem nos Hotéis de Trânsito e transporte institucional.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block text-sm mb-1">Finalidade da Pesquisa</span>
            Mensurar a qualidade do evento, identificar oportunidades de melhoria contínua e planejar as diretrizes do Simpósio de 2027.
          </div>
        </div>
      </div>

      {/* Relação das 12 Regiões Militares */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-serif font-bold text-stone-900 mb-1">
          Regiões Militares Integrantes
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mb-6">
          Representantes de todas as guarnições e comandos regionais do território nacional:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {REGIOES_MILITARES.slice(0, 12).map((rm) => (
            <div
              key={rm.id}
              className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-emerald-50/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-900">{rm.id}</span>
                <span className="text-[10px] text-stone-500 font-mono">{rm.hq}</span>
              </div>
              <p className="text-xs font-semibold text-stone-800 mt-1">{rm.name}</p>
              <p className="text-[11px] text-stone-500 mt-0.5">{rm.states}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 flex justify-center">
          <button
            type="button"
            onClick={onBackToForm}
            className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            ← Voltar ao Formulário de Pesquisa
          </button>
        </div>
      </div>
    </div>
  );
};
