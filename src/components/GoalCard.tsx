import React from 'react';
import {
  Calendar,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  CircleDashed,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Goal, GoalStatus, STATUS_CONFIG } from '../types/goal';
import {
  formatarDataBrasileira,
  calcularSituacaoPrazo,
} from '../utils/dateUtils';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onRequestDelete: (goal: Goal) => void;
  onUpdateStatus: (goalId: string, nextStatus: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onRequestDelete,
  onUpdateStatus,
}) => {
  const statusInfo = STATUS_CONFIG[goal.status];
  const situacaoPrazo = calcularSituacaoPrazo(goal.prazo, goal.status);

  // Determina o próximo status em um ciclo natural para o estudante
  const getNextStatus = (current: GoalStatus): GoalStatus => {
    if (current === 'nao_iniciado') return 'em_andamento';
    if (current === 'em_andamento') return 'concluido';
    return 'nao_iniciado';
  };

  const nextStatus = getNextStatus(goal.status);
  const nextStatusLabel =
    nextStatus === 'em_andamento'
      ? 'Iniciar estudo'
      : nextStatus === 'concluido'
      ? 'Marcar como concluído'
      : 'Reiniciar objetivo';

  return (
    <article
      className={`bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow transition-all duration-200 p-5 flex flex-col justify-between gap-4 relative group ${
        goal.status === 'concluido' ? 'bg-slate-50/40' : ''
      }`}
    >
      {/* Topo do Card: Status e Prazo */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Status com rótulo semântico e ícone */}
        <div className="flex items-center gap-1.5">
          {goal.status === 'nao_iniciado' && (
            <CircleDashed className="w-3.5 h-3.5 text-slate-500" />
          )}
          {goal.status === 'em_andamento' && (
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          )}
          {goal.status === 'concluido' && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${statusInfo.badgeClass}`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Data de Prazo com badge de alerta inteligente */}
        <div className="flex items-center gap-1.5 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-600 font-medium">
            {formatarDataBrasileira(goal.prazo)}
          </span>

          {situacaoPrazo.tipo === 'atrasado' && (
            <span className="text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {situacaoPrazo.texto}
            </span>
          )}

          {situacaoPrazo.tipo === 'hoje' && (
            <span className="text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[11px] font-semibold">
              Hoje!
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo Central: Título e Descrição */}
      <div className="space-y-2">
        <h3
          className={`text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-snug ${
            goal.status === 'concluido' ? 'line-through text-slate-500' : ''
          }`}
        >
          {goal.titulo}
        </h3>

        {goal.descricao ? (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line line-clamp-4">
            {goal.descricao}
          </p>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Sem descrição detalhada adicionada.
          </p>
        )}
      </div>

      {/* Rodapé do Card: Ações do Estudante */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Botão de Avanço Rápido de Status */}
        <button
          type="button"
          onClick={() => onUpdateStatus(goal.id, nextStatus)}
          className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
            nextStatus === 'concluido'
              ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200'
              : nextStatus === 'em_andamento'
              ? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200'
              : 'text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200'
          }`}
          title={`Alterar status para: ${STATUS_CONFIG[nextStatus].label}`}
        >
          <span>{nextStatusLabel}</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        {/* Botões de Edição e Exclusão */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            type="button"
            onClick={() => onEdit(goal)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors flex items-center gap-1 font-medium"
            title="Editar informações do objetivo"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editar</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestDelete(goal)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1 font-medium"
            title="Excluir objetivo (requer confirmação)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>
    </article>
  );
};
