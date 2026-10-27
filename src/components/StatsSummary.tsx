import React from 'react';
import { Target, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { Goal } from '../types/goal';

interface StatsSummaryProps {
  goals: Goal[];
  activeFilter: string;
  onSelectFilter: (filter: 'todos' | 'nao_iniciado' | 'em_andamento' | 'concluido') => void;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  goals,
  activeFilter,
  onSelectFilter,
}) => {
  const total = goals.length;
  const naoIniciados = goals.filter((g) => g.status === 'nao_iniciado').length;
  const emAndamento = goals.filter((g) => g.status === 'em_andamento').length;
  const concluidos = goals.filter((g) => g.status === 'concluido').length;

  const percentual = total === 0 ? 0 : Math.round((concluidos / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Painel de Aprendizado
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Resumo dos seus Objetivos
          </h2>
        </div>

        {/* Progresso Geral */}
        <div className="w-full md:w-64 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-600">Progresso Geral</span>
            <span className="font-mono tabular-nums text-indigo-700 font-bold">
              {percentual}% Concluído
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentual}%` }}
              role="progressbar"
              aria-valuenow={percentual}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Cards de Métricas Clicáveis (atuam também como atalhos de filtro) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-5">
        {/* Total */}
        <button
          type="button"
          onClick={() => onSelectFilter('todos')}
          className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all ${
            activeFilter === 'todos'
              ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200'
              : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-medium">Total Cadastrados</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {total}
          </div>
          <span className="text-[11px] text-slate-500">
            {total === 1 ? '1 meta cadastrada' : `${total} metas cadastradas`}
          </span>
        </button>

        {/* Não Iniciados */}
        <button
          type="button"
          onClick={() => onSelectFilter('nao_iniciado')}
          className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all ${
            activeFilter === 'nao_iniciado'
              ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-300'
              : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-medium">Não Iniciados</span>
            <CircleDashed className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-800">
            {naoIniciados}
          </div>
          <span className="text-[11px] text-slate-500">Para começar</span>
        </button>

        {/* Em Andamento */}
        <button
          type="button"
          onClick={() => onSelectFilter('em_andamento')}
          className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all ${
            activeFilter === 'em_andamento'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
              : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-medium">Em Andamento</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-900">
            {emAndamento}
          </div>
          <span className="text-[11px] text-amber-700">Foco do momento</span>
        </button>

        {/* Concluídos */}
        <button
          type="button"
          onClick={() => onSelectFilter('concluido')}
          className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all ${
            activeFilter === 'concluido'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200'
              : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-medium">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-900">
            {concluidos}
          </div>
          <span className="text-[11px] text-emerald-700">Metas atingidas</span>
        </button>
      </div>
    </div>
  );
};
