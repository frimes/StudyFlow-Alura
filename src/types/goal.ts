/**
 * Tipos e interfaces de dados para os objetivos de estudo do StudyFlow.
 */

export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface Goal {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string; // formato YYYY-MM-DD
  status: GoalStatus;
  criadoEm: string; // ISO string
}

export type GoalFormData = {
  titulo: string;
  descricao: string;
  prazo: string;
  status: GoalStatus;
};

export type StatusFilter = 'todos' | GoalStatus;

export type SortOption = 'prazo_asc' | 'prazo_desc' | 'recentes' | 'titulo';

export const STATUS_CONFIG: Record<
  GoalStatus,
  {
    label: string;
    description: string;
    badgeClass: string;
    borderClass: string;
    bgSoft: string;
    textClass: string;
  }
> = {
  nao_iniciado: {
    label: 'Não iniciado',
    description: 'Planejado para começar',
    badgeClass: 'text-slate-700 bg-slate-100 border border-slate-200',
    borderClass: 'border-slate-200',
    bgSoft: 'bg-slate-50',
    textClass: 'text-slate-600',
  },
  em_andamento: {
    label: 'Em andamento',
    description: 'Estudo em progresso ativo',
    badgeClass: 'text-amber-800 bg-amber-50 border border-amber-200',
    borderClass: 'border-amber-200',
    bgSoft: 'bg-amber-50/50',
    textClass: 'text-amber-700',
  },
  concluido: {
    label: 'Concluído',
    description: 'Objetivo de estudo alcançado!',
    badgeClass: 'text-emerald-800 bg-emerald-50 border border-emerald-200',
    borderClass: 'border-emerald-200',
    bgSoft: 'bg-emerald-50/50',
    textClass: 'text-emerald-700',
  },
};
