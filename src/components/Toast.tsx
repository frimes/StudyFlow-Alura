import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  tipo: 'sucesso' | 'info' | 'aviso';
  texto: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const bgClasses = {
    sucesso: 'bg-emerald-900 text-white border-emerald-800',
    info: 'bg-slate-900 text-white border-slate-800',
    aviso: 'bg-amber-900 text-white border-amber-800',
  }[toast.tipo];

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm transition-all animate-in slide-in-from-bottom-3 duration-200">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs sm:text-sm font-medium ${bgClasses}`}
        role="status"
        aria-live="polite"
      >
        {toast.tipo === 'sucesso' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {toast.tipo === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
        {toast.tipo === 'aviso' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}

        <span className="flex-1">{toast.texto}</span>

        <button
          type="button"
          onClick={onDismiss}
          className="text-white/70 hover:text-white p-1 rounded transition-colors"
          title="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
