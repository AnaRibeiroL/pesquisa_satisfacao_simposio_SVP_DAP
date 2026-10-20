import React from 'react';

interface LikertScaleProps {
  label: string;
  description?: string;
  value: number;
  onChange: (val: number) => void;
  required?: boolean;
  hasError?: boolean;
  helperText?: string;
}

const SCALE_OPTIONS = [
  { value: 1, label: '1 - Ruim', desc: 'Insuficiente / Ruim' },
  { value: 2, label: '2 - Regular', desc: 'Abaixo do esperado' },
  { value: 3, label: '3 - Bom', desc: 'Atendeu às expectativas' },
  { value: 4, label: '4 - Muito Bom', desc: 'Superou expectativas' },
  { value: 5, label: '5 - Excelente', desc: 'Excelente / Alto Padrão' },
];

export const LikertScale: React.FC<LikertScaleProps> = ({
  label,
  description,
  value,
  onChange,
  required = true,
  hasError = false,
  helperText,
}) => {
  return (
    <div
      className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
        hasError
          ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200'
          : value > 0
          ? 'bg-emerald-50/30 border-emerald-200'
          : 'bg-white border-stone-200 hover:border-stone-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
        <label className="text-sm sm:text-base font-semibold text-stone-900 leading-snug">
          {label}
          {required && <span className="text-amber-700 ml-1 font-bold" title="Obrigatório">*</span>}
        </label>
        {value > 0 && (
          <span className="text-xs font-semibold text-emerald-800 tracking-wide">
            {SCALE_OPTIONS.find((o) => o.value === value)?.desc}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs sm:text-sm text-stone-600 mb-3.5 leading-relaxed">
          {description}
        </p>
      )}

      {/* Escala Linear de 1 a 5 */}
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {SCALE_OPTIONS.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-1 sm:px-2 rounded-lg border text-center transition-all cursor-pointer select-none active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200 hover:border-emerald-300'
                }`}
                aria-pressed={isSelected}
              >
                <span className={`text-base sm:text-xl font-bold font-mono ${isSelected ? 'text-amber-300' : 'text-stone-800'}`}>
                  {opt.value}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-medium mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-amber-100 font-semibold' : 'text-stone-500'
                  }`}
                >
                  {opt.label.split(' - ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Marcadores de extremidade */}
        <div className="flex justify-between items-center px-1 pt-1 text-[11px] text-stone-500">
          <span>1 = Insuficiente / Ruim</span>
          <span>5 = Excelente</span>
        </div>
      </div>

      {hasError && (
        <p className="text-xs text-rose-600 font-medium mt-2 flex items-center gap-1">
          Por favor, atribua uma nota de 1 a 5 para esta avaliação.
        </p>
      )}

      {helperText && !hasError && (
        <p className="text-xs text-stone-500 mt-2">{helperText}</p>
      )}
    </div>
  );
};
