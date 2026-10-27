/**
 * Serviço de persistência local (localStorage) para os objetivos do StudyFlow.
 * Garante que os dados sejam preservados após recarregar a página.
 */

import { Goal } from '../types/goal';
import { getTodayDateString } from '../utils/dateUtils';

const STORAGE_KEY = 'studyflow_goals_v1';
const FIRST_VISIT_FLAG = 'studyflow_has_visited_v1';

/**
 * Metas padrão acolhedoras para o primeiro contato de um estudante iniciante.
 */
export function getSampleGoals(): Goal[] {
  const today = new Date();
  
  // Data em 2 dias
  const data2Dias = new Date(today);
  data2Dias.setDate(today.getDate() + 2);
  const prazo2Dias = data2Dias.toISOString().split('T')[0];

  // Data em 7 dias
  const data7Dias = new Date(today);
  data7Dias.setDate(today.getDate() + 7);
  const prazo7Dias = data7Dias.toISOString().split('T')[0];

  // Data de ontem para exemplo de concluído
  const dataOntem = new Date(today);
  dataOntem.setDate(today.getDate() - 1);
  const prazoOntem = dataOntem.toISOString().split('T')[0];

  return [
    {
      id: 'exemplo-1',
      titulo: 'Entender a diferença entre let, const e var em JavaScript',
      descricao: 'Assistir à aula introdutória de escopo de variáveis e praticar 3 pequenos exemplos no console do navegador.',
      prazo: prazo2Dias,
      status: 'em_andamento',
      criadoEm: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 'exemplo-2',
      titulo: 'Criar meu primeiro resumo sobre Métodos de Estudo',
      descricao: 'Anotar os conceitos da técnica Pomodoro e repetição espaçada no meu caderno de estudos.',
      prazo: prazoOntem,
      status: 'concluido',
      criadoEm: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
    {
      id: 'exemplo-3',
      titulo: 'Resolver 10 exercícios básicos de fixação de lógica',
      descricao: 'Focar em estruturas de decisão (se/senão) e loops simples para fixar o raciocínio.',
      prazo: prazo7Dias,
      status: 'nao_iniciado',
      criadoEm: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ];
}

export const storageService = {
  /**
   * Carrega os objetivos salvos no localStorage.
   * Se for o primeiro acesso da pessoa estudante, inicializa com metas de exemplo.
   */
  loadGoals(): Goal[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const hasVisited = localStorage.getItem(FIRST_VISIT_FLAG);

      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }

      // Primeiro acesso: inicializa com exemplos acolhedores
      if (!hasVisited) {
        const initial = getSampleGoals();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        localStorage.setItem(FIRST_VISIT_FLAG, 'true');
        return initial;
      }

      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista de objetivos no localStorage.
   */
  saveGoals(goals: Goal[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
      localStorage.setItem(FIRST_VISIT_FLAG, 'true');
      return true;
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
      return false;
    }
  },

  /**
   * Restaura os objetivos de exemplo para testes ou reinício.
   */
  restoreSampleGoals(): Goal[] {
    const samples = getSampleGoals();
    this.saveGoals(samples);
    return samples;
  },

  /**
   * Remove todos os objetivos do armazenamento.
   */
  clearAllGoals(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(FIRST_VISIT_FLAG, 'true');
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  },
};
