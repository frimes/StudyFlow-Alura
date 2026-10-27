import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle, BookOpen, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { Goal, GoalFormData, GoalStatus } from '../types/goal';
import { getTodayDateString } from '../utils/dateUtils';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: GoalFormData) => void;
  editingGoal: Goal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingGoal,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState(getTodayDateString());
  const [status, setStatus] = useState<GoalStatus>('nao_iniciado');
  const [errorMessage, setErrorMessage] = useState('');

  // Preenche os dados quando em modo edição ou reseta para novo objetivo
  useEffect(() => {
    if (editingGoal) {
      setTitulo(editingGoal.titulo);
      setDescricao(editingGoal.descricao || '');
      setPrazo(editingGoal.prazo || getTodayDateString());
      setStatus(editingGoal.status);
    } else {
      setTitulo('');
      setDescricao('');
      setPrazo(getTodayDateString());
      setStatus('nao_iniciado');
    }
    setErrorMessage('');
  }, [editingGoal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tituloLimpo = titulo.trim();
    if (!tituloLimpo) {
      setErrorMessage('Por favor, digite o título do objetivo de estudo.');
      return;
    }

    if (!prazo) {
      setErrorMessage('Por favor, informe a data de prazo do estudo.');
      return;
    }

    onSubmit({
      titulo: tituloLimpo,
      descricao: descricao.trim(),
      prazo,
      status,
    });
  };

  // Atalhos rápidos para preenchimento de prazo
  const setQuickDeadline = (daysToAdd: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysToAdd);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    setPrazo(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-slate-900 leading-tight">
                {editingGoal ? 'Editar Objetivo de Estudo' : 'Novo Objetivo de Estudo'}
              </h2>
              <p className="text-xs text-slate-500">
                {editingGoal
                  ? 'Atualize as informações e o status do seu aprendizado'
                  : 'Defina com clareza o que você pretende aprender'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-800 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Campo: Título */}
          <div>
            <label htmlFor="goal-titulo" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="goal-titulo"
              type="text"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Ex: Aprender funções de alta ordem em JavaScript"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 placeholder:text-slate-400 font-medium transition-all"
              autoFocus
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Dica: Seja específico! Em vez de apenas "Python", use "Aprender listas e dicionários em Python".
            </p>
          </div>

          {/* Campo: Descrição */}
          <div>
            <label htmlFor="goal-descricao" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Descrição e Anotações <span className="text-slate-400 font-normal lowercase">(opcional)</span>
            </label>
            <textarea
              id="goal-descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              placeholder="Detalhes do que estudar, capítulos do livro, links de vídeos úteis ou passos para praticar..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 placeholder:text-slate-400 transition-all resize-y"
            />
          </div>

          {/* Campo: Prazo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="goal-prazo" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Prazo de Conclusão <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Atalhos rápidos:</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="relative flex-1">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="goal-prazo"
                  type="date"
                  value={prazo}
                  onChange={(e) => {
                    setPrazo(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 font-mono transition-all"
                />
              </div>

              {/* Botões rápidos de prazo */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuickDeadline(0)}
                  className="px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors"
                >
                  Hoje
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(3)}
                  className="px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors"
                >
                  +3 dias
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(7)}
                  className="px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors"
                >
                  +1 sem
                </button>
              </div>
            </div>
          </div>

          {/* Campo: Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Status Atual
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('nao_iniciado')}
                className={`py-2 px-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                  status === 'nao_iniciado'
                    ? 'border-slate-500 bg-slate-100 text-slate-900 ring-2 ring-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CircleDashed className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-xs font-bold leading-none">Não iniciado</span>
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">Para começar</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('em_andamento')}
                className={`py-2 px-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                  status === 'em_andamento'
                    ? 'border-amber-400 bg-amber-50 text-amber-900 ring-2 ring-amber-200'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold leading-none">Em andamento</span>
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">Estudando agora</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('concluido')}
                className={`py-2 px-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                  status === 'concluido'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold leading-none">Concluído</span>
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">Meta alcançada</span>
              </button>
            </div>
          </div>

          {/* Rodapé e Ações do Formulário */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
            >
              {editingGoal ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
