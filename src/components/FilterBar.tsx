import React from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { StatusFilter, SortOption } from '../types/goal';

interface FilterBarProps {
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  sortOption: SortOption;
  onSortOptionChange: (sort: SortOption) => void;
  totalFiltered: number;
  totalGoals: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
  sortOption,
  onSortOptionChange,
  totalFiltered,
  totalGoals,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-4">
      {/* Linha superior: Barra de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Buscar por título ou descrição do estudo..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 text-slate-800"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ordenação */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Ordenar:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
            className="text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 font-medium cursor-pointer"
          >
            <option value="prazo_asc">Prazo mais próximo</option>
            <option value="prazo_desc">Prazo mais distante</option>
            <option value="recentes">Mais recentes primeiro</option>
            <option value="titulo">Ordem alfabética (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Linha inferior: Segmented Controls de Status + Indicador de itens */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => onStatusFilterChange('todos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'todos'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('nao_iniciado')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'nao_iniciado'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Não iniciados
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('em_andamento')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'em_andamento'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Em andamento
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('concluido')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'concluido'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Concluídos
          </button>
        </div>

        {/* Quantidade visível */}
        <div className="text-xs text-slate-500 font-mono tabular-nums whitespace-nowrap">
          {totalFiltered === totalGoals ? (
            <span>
              Mostrando <strong className="text-slate-700">{totalGoals}</strong> objetivos
            </span>
          ) : (
            <span>
              Filtrados <strong className="text-slate-700">{totalFiltered}</strong> de {totalGoals}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
