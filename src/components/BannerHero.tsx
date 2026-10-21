import React from 'react';

interface BannerHeroProps {
  onOpenShare?: () => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({ onOpenShare }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0a2014] to-[#0f2d1c] border-b border-amber-500/20 shadow-lg text-white">
      {/* Decoração sutil de fundo militar */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8">
        {/* Banner oficial e mapa das Regiões Militares (imagens inteiras, sem corte) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl bg-[#022b00] flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}assets/banner_simposio.png`}
              alt="Simpósio de Veteranos e Pensionistas - 19 a 22 de outubro de 2026"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl bg-[#022b00] flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}assets/mapa_regioes_militares.png`}
              alt="Mapa do Brasil com os brasões das Regiões Militares"
              className="w-full h-auto max-h-[420px] object-contain"
            />
          </div>
        </div>
        <p className="mt-4 text-center font-serif text-amber-300 text-base sm:text-lg">
          <strong>Diretoria de Assistência ao Pessoal</strong>
          <span className="block text-amber-100/90 italic text-sm sm:text-base">A serviço da Família Militar</span>
        </p>

        {/* Bloco de Apresentação e Instruções */}
        <div className="mt-8 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-amber-300 font-medium tracking-wide uppercase">
            <span>DGP</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>DAP</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>Auditório CMP</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>19 a 22 de Outubro de 2026</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>1ª a 12ª RM</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-wide text-balance">
                Pesquisa de Satisfação institucional
              </h1>
              <p className="mt-1 text-base sm:text-lg text-amber-100/90 font-serif">
                Simpósio Seção de Veteranos e Pensionistas — SVP / DAP 2026
              </p>
            </div>

            {onOpenShare && (
              <button
                type="button"
                onClick={onOpenShare}
                className="self-center sm:self-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>📲 Projetar QR Code</span>
              </button>
            )}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-black/25 border border-white/10 backdrop-blur-xs text-stone-200 text-sm sm:text-base leading-relaxed">
            <p>
              Esta pesquisa tem por finalidade avaliar o <strong>Simpósio da Seção de Veteranos e Pensionistas SVP/DAP 2026</strong>. 
              As respostas são fundamentais para mensurar a qualidade do evento, aprimorar a logística, otimizar a programação e elevar o padrão dos próximos encontros institucionais.
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
              <span>⏱ Duração estimada: <strong>4 a 6 minutos</strong></span>
              <span>🔒 Respostas confidenciais para aperfeiçoamento institucional</span>
              <span>⭐ Escala de 1 (Insuficiente/Ruim) a 5 (Excelente)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
