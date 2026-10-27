import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Goal } from '../types/goal';

interface ConfirmModalProps {
  isOpen: boolean;
  goal: Goal | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  goal,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !goal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 id="dialog-title" className="text-base font-bold text-slate-900 leading-snug">
                  Confirmar Exclusão
                </h3>
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p id="dialog-desc" className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Tem certeza de que deseja excluir o objetivo de estudo:
              </p>

              <div className="my-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 break-words">
                "{goal.titulo}"
              </div>

              <p className="text-[11px] text-slate-500">
                Esta ação é irreversível e o objetivo será removido da sua lista e da memória do navegador.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-all active:scale-[0.98]"
          >
            Sim, excluir objetivo
          </button>
        </div>
      </div>
    </div>
  );
};
