import { useQuery } from '@tanstack/react-query';
import { agentsApi } from './api';

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => agentsApi.getAgents(),
  });
}

export function useAgent(id?: string) {
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => (id ? agentsApi.getAgentById(id) : null),
    enabled: !!id,
  });
}
