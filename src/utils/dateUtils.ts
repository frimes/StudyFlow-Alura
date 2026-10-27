/**
 * Utilitários para formatação e cálculo de prazos de estudo em português.
 */

import { GoalStatus } from '../types/goal';

/**
 * Converte 'YYYY-MM-DD' em objeto Date no fuso local.
 */
export function parseLocalDate(dateString: string): Date {
  const [ano, mes, dia] = dateString.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

/**
 * Retorna a data de hoje no formato YYYY-MM-DD para inicializar inputs de data.
 */
export function getTodayDateString(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Formata data YYYY-MM-DD de forma legível em português (ex: "28/10/2026").
 */
export function formatarDataBrasileira(dateString: string): string {
  if (!dateString) return 'Sem prazo definido';
  try {
    const [ano, mes, dia] = dateString.split('-');
    if (!ano || !mes || !dia) return dateString;
    return `${dia}/${mes}/${ano}`;
  } catch {
    return dateString;
  }
}

/**
 * Avalia o prazo em relação ao momento atual.
 */
export function calcularSituacaoPrazo(
  prazoString: string,
  status: GoalStatus
): {
  texto: string;
  tipo: 'concluido' | 'hoje' | 'atrasado' | 'proximo' | 'futuro';
  diasDiferenca: number;
} {
  if (status === 'concluido') {
    return {
      texto: 'Finalizado com sucesso',
      tipo: 'concluido',
      diasDiferenca: 0,
    };
  }

  if (!prazoString) {
    return {
      texto: 'Sem prazo',
      tipo: 'futuro',
      diasDiferenca: 999,
    };
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataPrazo = parseLocalDate(prazoString);
  dataPrazo.setHours(0, 0, 0, 0);

  const diffMs = dataPrazo.getTime() - hoje.getTime();
  const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 0) {
    const absDias = Math.abs(diffDias);
    return {
      texto: absDias === 1 ? 'Atrasado em 1 dia' : `Atrasado em ${absDias} dias`,
      tipo: 'atrasado',
      diasDiferenca: diffDias,
    };
  }

  if (diffDias === 0) {
    return {
      texto: 'Vence hoje!',
      tipo: 'hoje',
      diasDiferenca: 0,
    };
  }

  if (diffDias === 1) {
    return {
      texto: 'Vence amanhã',
      tipo: 'proximo',
      diasDiferenca: 1,
    };
  }

  if (diffDias <= 7) {
    return {
      texto: `Vence em ${diffDias} dias`,
      tipo: 'proximo',
      diasDiferenca: diffDias,
    };
  }

  return {
    texto: `Prazo em ${diffDias} dias`,
    tipo: 'futuro',
    diasDiferenca: diffDias,
  };
}
