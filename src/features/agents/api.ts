import { MOCK_AGENTS } from '@/data/agents.mock';
import { Agent } from '@/types/schema';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const agentsApi = {
  getAgents: async (): Promise<Agent[]> => {
    await delay();
    return MOCK_AGENTS;
  },

  getAgentById: async (id: string): Promise<Agent | null> => {
    await delay();
    return MOCK_AGENTS.find((a) => a.id === id) ?? null;
  },
};
