import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';

interface ShareModalProps {
  onClose: () => void;
}

const GITHUB_PAGES_URL = 'https://anaribeirol.github.io/pesquisa_satisfacao_simposio_SVP_DAP/';

export const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [selectedUrlType, setSelectedUrlType] = useState<'github' | 'current' | 'custom'>('github');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [activeUrl, setActiveUrl] = useState<string>(GITHUB_PAGES_URL);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isAuditoriumMode, setIsAuditoriumMode] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determina a URL ativa
  useEffect(() => {
    let target = GITHUB_PAGES_URL;
    if (selectedUrlType === 'github') {
      target = GITHUB_PAGES_URL;
    } else if (selectedUrlType === 'current' && typeof window !== 'undefined') {
      target = window.location.href;
    } else if (selectedUrlType === 'custom') {
      target = customUrl.trim() || GITHUB_PAGES_URL;
    }
    setActiveUrl(target);
  }, [selectedUrlType, customUrl]);

  // Gera o QR Code com alta resolução e logotipo institucional central
  useEffect(() => {
    if (!activeUrl) return;
    setIsGenerating(true);

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;

    QRCode.toCanvas(
      canvas,
      activeUrl,
      {
        width: 1200,
        margin: 2,
        errorCorrectionLevel: 'H', // Alta tolerância a perdas (permite o logotipo no centro)
        color: {
          dark: '#0c2417', // Verde militar escuro institucional
          light: '#ffffff',
        },
      },
      (err) => {
        if (err) {
          console.error('Erro ao gerar QR code:', err);
          setIsGenerating(false);
          return;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Desenhar anel dourado institucional no centro
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const badgeSize = 220;

          // Fundo branco com cantos arredondados
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(centerX, centerY, badgeSize / 2 + 18, 0, Math.PI * 2);
          ctx.fill();

          // Borda verde e dourada
          ctx.lineWidth = 10;
          ctx.strokeStyle = '#0c2417';
          ctx.stroke();

          ctx.lineWidth = 4;
          ctx.strokeStyle = '#d4af37'; // Dourado
          ctx.stroke();

          // Desenhar o escudo da DAP ou símbolo militar no centro
          ctx.fillStyle = '#0c2417';
          ctx.beginPath();
          ctx.arc(centerX, centerY, badgeSize / 2 + 2, 0, Math.PI * 2);
          ctx.fill();

          // Texto institucional "DAP 2026"
          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 54px Cinzel, serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('DAP', centerX, centerY - 20);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText('2026', centerX, centerY + 30);

          ctx.restore();
        }

        const dataUrl = canvas.toDataURL('image/png');
        setQrDataUrl(dataUrl);
        setIsGenerating(false);
      }
    );
  }, [activeUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QRCode_Pesquisa_Simposio_DAP_2026.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintFlyer = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Modo Telão do Auditório CMP */}
      {isAuditoriumMode ? (
        <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#07190f] via-[#0c2417] to-[#07190f] text-white rounded-3xl border-2 border-amber-400/40 p-6 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center my-auto">
          {/* Botão fechar modo telão */}
          <button
            onClick={() => setIsAuditoriumMode(false)}
            className="absolute top-6 right-6 px-4 py-2 bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold rounded-xl border border-stone-600 transition-colors cursor-pointer"
          >
            ✕ Sair do Modo Telão
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-amber-300 font-mono mb-2">
            <span>DGP</span>
            <span>·</span>
            <span>DAP</span>
            <span>·</span>
            <span>Auditório CMP</span>
            <span>·</span>
            <span>19 a 22 de Outubro de 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide">
            Pesquisa de Satisfação Institucional
          </h2>
          <p className="mt-2 text-base sm:text-xl text-amber-100/90 font-serif max-w-2xl">
            Simpósio da Seção de Veteranos e Pensionistas — SVP / DAP 2026
          </p>

          {/* QR Code Gigante */}
          <div className="mt-8 p-6 sm:p-8 bg-white rounded-3xl shadow-2xl border-4 border-amber-400 max-w-md w-full">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code da Pesquisa"
                className="w-full h-auto aspect-square object-contain rounded-xl"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center text-stone-500 font-medium">
                Gerando QR Code...
              </div>
            )}
            <div className="mt-4 pt-3 border-t border-stone-200">
              <span className="text-xs sm:text-sm font-bold text-emerald-950 font-serif tracking-wider uppercase block">
                Aponte a Câmera do seu Celular
              </span>
              <span className="text-xs text-stone-600 block mt-0.5">
                Acesso direto e instantâneo ao formulário
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-stone-300">
            <span className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 font-mono">
              {activeUrl}
            </span>
          </div>
        </div>
      ) : (
        /* Modal Normal com Controles e Configurações */
        <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-[#0a2014] via-[#123524] to-[#0a2014] p-5 sm:p-6 text-white flex justify-between items-center border-b border-amber-500/30">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                Acesso dos Participantes · Simpósio DAP 2026
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                Gerador de QR Code da Pesquisa
              </h2>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Seletor de URL de Destino */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                URL de Destino do QR Code:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUrlType('github')}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedUrlType === 'github'
                      ? 'bg-emerald-900 text-amber-300 border-emerald-900 font-semibold shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <span className="block font-bold">GitHub Pages</span>
                  <span className="text-[10px] opacity-80 block truncate mt-0.5">
                    anaribeirol.github.io
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedUrlType('current')}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedUrlType === 'current'
                      ? 'bg-emerald-900 text-amber-300 border-emerald-900 font-semibold shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <span className="block font-bold">Endereço atual</span>
                  <span className="text-[10px] opacity-80 block truncate mt-0.5">
                    Página aberta agora
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedUrlType('custom')}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedUrlType === 'custom'
                      ? 'bg-emerald-900 text-amber-300 border-emerald-900 font-semibold shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <span className="block font-bold">URL Personalizada</span>
                  <span className="text-[10px] opacity-80 block truncate mt-0.5">
                    Encurtador ou Intranet
                  </span>
                </button>
              </div>

              {selectedUrlType === 'custom' && (
                <div className="mt-2.5">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://sua-url-ou-encurtador.eb.mil.br/pesquisa"
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              )}
            </div>

            {/* Visualização Central do QR Code */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="relative shrink-0 p-3 bg-white rounded-2xl border-2 border-emerald-900 shadow-sm">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code Oficial da Pesquisa"
                    className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center text-xs text-stone-500">
                    {isGenerating ? 'Renderizando...' : 'Carregando...'}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3 text-left">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-900 uppercase">
                    Pronto para Uso Imediato
                  </span>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Acesso Rápido via Câmera do Smartphone
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Este QR Code direciona os oficiais e praças diretamente ao formulário oficial,
                    permitindo o envio ágil de respostas durante a plenária ou intervalos.
                  </p>
                </div>

                {/* Caixa do Link com Copiar */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-stone-500">Endereço Codificado:</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      readOnly
                      value={activeUrl}
                      className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-stone-300 rounded-lg text-stone-800 select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                    >
                      {copied ? 'Copiado! ✓' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline"
                  >
                    Abrir link em nova aba para testar ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Ações para o Evento de Amanhã */}
            <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Baixar imagem em alta resolução para incluir em slides de apresentação"
                >
                  <span>⬇ Baixar PNG (Alta Resolução)</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintFlyer}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors cursor-pointer"
                >
                  Imprimir Folha A4
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsAuditoriumMode(true)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🖥 Projetar no Telão do Auditório CMP</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
