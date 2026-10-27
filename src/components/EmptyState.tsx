import React from 'react';
import { BookOpen, Plus, RefreshCw, SearchX } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onNewGoal: () => void;
  onClearFilters?: () => void;
  onLoadSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onNewGoal,
  onClearFilters,
  onLoadSamples,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
          Nenhum objetivo encontrado com esses filtros
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          Não encontramos nenhum objetivo correspondente à sua busca ou filtro selecionado. Experimente limpar os filtros para ver todas as suas metas.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Ver todos os objetivos</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-7 h-7" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
        Nenhum objetivo de estudo cadastrado ainda
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
        Grandes conquistas de aprendizado começam com pequenas metas claras! Cadastre seu primeiro objetivo com título, descrição, prazo e status.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNewGoal}
          className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar meu primeiro objetivo</span>
        </button>

        {onLoadSamples && (
          <button
            type="button"
            onClick={onLoadSamples}
            className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Carregar metas de exemplo</span>
          </button>
        )}
      </div>
    </div>
  );
};
