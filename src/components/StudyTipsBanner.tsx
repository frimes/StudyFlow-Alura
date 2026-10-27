import React from 'react';
import { Sparkles, CheckCheck, Clock, Compass, X } from 'lucide-react';

interface StudyTipsBannerProps {
  onClose: () => void;
}

export const StudyTipsBanner: React.FC<StudyTipsBannerProps> = ({ onClose }) => {
  return (
    <div className="bg-linear-to-r from-indigo-50/90 via-sky-50/70 to-emerald-50/80 border border-indigo-200/80 rounded-2xl p-5 sm:p-6 shadow-xs relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        title="Ocultar dicas"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Guia do Iniciante: Como criar objetivos de estudo eficientes
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
        <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3.5 border border-indigo-100">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-700 font-semibold text-xs">
            <Compass className="w-4 h-4 shrink-0" />
            <span>1. Decomponha em partes</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Evite metas vagas como "Aprender Programação". Prefira "Aprender condicionais if/else e fazer 3 exercícios".
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3.5 border border-sky-100">
          <div className="flex items-center gap-2 mb-1.5 text-sky-700 font-semibold text-xs">
            <Clock className="w-4 h-4 shrink-0" />
            <span>2. Defina prazos realistas</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Metas com prazo curto (2 a 7 dias) ajudam a manter a cadência de estudos sem desanimar ou procrastinar.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3.5 border border-emerald-100">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-700 font-semibold text-xs">
            <CheckCheck className="w-4 h-4 shrink-0" />
            <span>3. Celebre pequenas vitórias</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ao terminar um tópico, mude o status para Concluído! O reforço positivo estimula seu cérebro a continuar focado.
          </p>
        </div>
      </div>
    </div>
  );
};
