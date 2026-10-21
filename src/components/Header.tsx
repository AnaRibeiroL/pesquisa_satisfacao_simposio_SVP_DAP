import React from 'react';

interface HeaderProps {
  currentView: 'form' | 'dashboard' | 'about';
  onNavigate: (view: 'form' | 'dashboard' | 'about') => void;
  onOpenShare: () => void;
  responseCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenShare,
  responseCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('form')}
          className="text-sm sm:text-lg font-serif font-bold tracking-wide sm:tracking-wider text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap text-left cursor-pointer"
        >
          SIMPÓSIO SVP / DAP 2026
        </button>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
          <button
            onClick={() => onNavigate('form')}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'form' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Formulário da Pesquisa
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'dashboard' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            <span>Painel de Resultados</span>
            <span className="text-[11px] font-mono bg-stone-800 border border-stone-700 px-1.5 py-0.2 rounded text-amber-300">
              {responseCount}
            </span>
          </button>
          <button
            onClick={onOpenShare}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 text-amber-300/90 font-medium"
            title="Abrir QR Code para projetar no Auditório CMP ou imprimir"
          >
            <span>Projetar QR Code</span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'about' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Sobre o Simpósio
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'form' ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Ver Painel ({responseCount})
            </button>
          ) : (
            <button
              onClick={() => onNavigate('form')}
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Preencher Pesquisa
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
