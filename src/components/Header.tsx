import React from 'react';
import { BookOpen, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNewGoal: () => void;
  onToggleTips: () => void;
  showTips: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewGoal,
  onToggleTips,
  showTips,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Marca / Título */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
              StudyFlow
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">
              Organização de objetivos de estudo
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTips}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              showTips
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Dicas de estudo para iniciantes"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Dicas de Estudo</span>
            <span className="sm:hidden">Dicas</span>
          </button>

          <button
            type="button"
            onClick={onNewGoal}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
