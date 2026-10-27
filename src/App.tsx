/**
 * StudyFlow - Aplicação para estudantes iniciantes organizarem seus objetivos de estudo.
 * Primeira versão focada em simplicidade, acolhimento e persistência via localStorage.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsSummary } from './components/StatsSummary';
import { FilterBar } from './components/FilterBar';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { ConfirmModal } from './components/ConfirmModal';
import { EmptyState } from './components/EmptyState';
import { StudyTipsBanner } from './components/StudyTipsBanner';
import { Toast, ToastMessage } from './components/Toast';
import { Goal, GoalFormData, GoalStatus, StatusFilter, SortOption } from './types/goal';
import { storageService } from './services/storageService';
import { parseLocalDate } from './utils/dateUtils';

export default function App() {
  // Estado dos objetivos carregados do localStorage
  const [goals, setGoals] = useState<Goal[]>(() => storageService.loadGoals());

  // Estados de controle de modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);

  // Estados de filtro, busca e ordenação
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('prazo_asc');

  // Estado das dicas de estudo (abertas por padrão na primeira sessão)
  const [showTips, setShowTips] = useState(() => {
    return localStorage.getItem('studyflow_hide_tips') !== 'true';
  });

  // Notificação toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (texto: string, tipo: 'sucesso' | 'info' | 'aviso' = 'sucesso') => {
    setToast({
      id: String(Date.now()),
      tipo,
      texto,
    });
  };

  // Persiste no localStorage sempre que os objetivos forem atualizados
  useEffect(() => {
    storageService.saveGoals(goals);
  }, [goals]);

  // Manipulador para alternar visibilidade das dicas
  const handleToggleTips = () => {
    const nextState = !showTips;
    setShowTips(nextState);
    if (!nextState) {
      localStorage.setItem('studyflow_hide_tips', 'true');
    } else {
      localStorage.removeItem('studyflow_hide_tips');
    }
  };

  // Abrir modal para novo objetivo
  const handleOpenNewGoalModal = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  // Abrir modal para editar objetivo existente
  const handleOpenEditGoalModal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  // Salvar objetivo (criação ou atualização)
  const handleSaveGoal = (formData: GoalFormData) => {
    if (editingGoal) {
      // Atualizar objetivo existente
      setGoals((prev) =>
        prev.map((g) =>
          g.id === editingGoal.id
            ? {
                ...g,
                titulo: formData.titulo,
                descricao: formData.descricao,
                prazo: formData.prazo,
                status: formData.status,
              }
            : g
        )
      );
      showToast('Objetivo atualizado com sucesso!', 'sucesso');
    } else {
      // Criar novo objetivo
      const newGoal: Goal = {
        id: 'goal_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        titulo: formData.titulo,
        descricao: formData.descricao,
        prazo: formData.prazo,
        status: formData.status,
        criadoEm: new Date().toISOString(),
      };
      setGoals((prev) => [newGoal, ...prev]);
      showToast('Novo objetivo cadastrado com sucesso!', 'sucesso');
    }

    setIsFormOpen(false);
    setEditingGoal(null);
  };

  // Solicitar exclusão (abre o modal de confirmação)
  const handleRequestDelete = (goal: Goal) => {
    setDeletingGoal(goal);
  };

  // Confirmar exclusão após diálogo
  const handleConfirmDelete = () => {
    if (!deletingGoal) return;
    const tituloExcluido = deletingGoal.titulo;
    setGoals((prev) => prev.filter((g) => g.id !== deletingGoal.id));
    setDeletingGoal(null);
    showToast(`Objetivo "${tituloExcluido}" excluído.`, 'info');
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setDeletingGoal(null);
  };

  // Atualização rápida de status diretamente pelo card
  const handleUpdateStatus = (goalId: string, nextStatus: GoalStatus) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, status: nextStatus } : g))
    );

    const statusNomes: Record<GoalStatus, string> = {
      nao_iniciado: 'Não iniciado',
      em_andamento: 'Em andamento',
      concluido: 'Concluído 🎉',
    };

    showToast(`Status atualizado para: ${statusNomes[nextStatus]}`, 'sucesso');
  };

  // Carregar exemplos se a lista estiver vazia
  const handleLoadSamples = () => {
    const samples = storageService.restoreSampleGoals();
    setGoals(samples);
    showToast('Objetivos de exemplo carregados!', 'sucesso');
  };

  // Limpar busca e filtros
  const handleClearFilters = () => {
    setStatusFilter('todos');
    setSearchQuery('');
  };

  // Filtragem e ordenação dos objetivos
  const filteredAndSortedGoals = useMemo(() => {
    let result = [...goals];

    // Filtro de status
    if (statusFilter !== 'todos') {
      result = result.filter((g) => g.status === statusFilter);
    }

    // Busca textual no título e descrição
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.titulo.toLowerCase().includes(q) ||
          g.descricao.toLowerCase().includes(q)
      );
    }

    // Ordenação
    result.sort((a, b) => {
      if (sortOption === 'prazo_asc') {
        const timeA = a.prazo ? parseLocalDate(a.prazo).getTime() : Infinity;
        const timeB = b.prazo ? parseLocalDate(b.prazo).getTime() : Infinity;
        return timeA - timeB;
      }
      if (sortOption === 'prazo_desc') {
        const timeA = a.prazo ? parseLocalDate(a.prazo).getTime() : -Infinity;
        const timeB = b.prazo ? parseLocalDate(b.prazo).getTime() : -Infinity;
        return timeB - timeA;
      }
      if (sortOption === 'recentes') {
        return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime();
      }
      if (sortOption === 'titulo') {
        return a.titulo.localeCompare(b.titulo, 'pt-BR');
      }
      return 0;
    });

    return result;
  }, [goals, statusFilter, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Barra de Navegação Superior */}
      <Header
        onNewGoal={handleOpenNewGoalModal}
        onToggleTips={handleToggleTips}
        showTips={showTips}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Banner com Dicas Pedagógicas para Iniciantes */}
        {showTips && (
          <StudyTipsBanner onClose={() => handleToggleTips()} />
        )}

        {/* Painel com Quantidade e Métricas dos Objetivos Cadastrados */}
        <StatsSummary
          goals={goals}
          activeFilter={statusFilter}
          onSelectFilter={(filtro) => setStatusFilter(filtro)}
        />

        {/* Barra de Filtros, Pesquisa e Ordenação */}
        {goals.length > 0 && (
          <FilterBar
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            sortOption={sortOption}
            onSortOptionChange={setSortOption}
            totalFiltered={filteredAndSortedGoals.length}
            totalGoals={goals.length}
          />
        )}

        {/* Lista de Cartões de Objetivos ou Estados Vazios */}
        <section aria-label="Lista de objetivos de estudo">
          {goals.length === 0 ? (
            <EmptyState
              isFiltered={false}
              onNewGoal={handleOpenNewGoalModal}
              onLoadSamples={handleLoadSamples}
            />
          ) : filteredAndSortedGoals.length === 0 ? (
            <EmptyState
              isFiltered={true}
              onNewGoal={handleOpenNewGoalModal}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredAndSortedGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleOpenEditGoalModal}
                  onRequestDelete={handleRequestDelete}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Rodapé Simples e Acolhedor */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">StudyFlow</span> · Organização prática de estudos para iniciantes
          </div>
          <div className="flex items-center gap-4">
            <span>Dados salvos localmente no seu navegador</span>
          </div>
        </div>
      </footer>

      {/* Modal de Formulário (Cadastro / Edição) */}
      <GoalFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveGoal}
        editingGoal={editingGoal}
      />

      {/* Modal de Confirmação para Exclusão Segura */}
      <ConfirmModal
        isOpen={deletingGoal !== null}
        goal={deletingGoal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Notificação Toast de Feedback */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
