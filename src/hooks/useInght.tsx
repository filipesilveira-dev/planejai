import { useCallback, useEffect, useState } from "react";
import { useSimulationStorage } from "./useSimulationStorage";
import type { InsightData } from "../services/aiService";
import { buildAIPrompt } from "../data/iaPrompt";
import { getInsight } from "../services/aiService";

export const useInsight = (id: string) => {
  // recebe os dados já formatados da API do Gemini. Inicializado como null, indicando que ainda não foi feita a requisição à inteligÊncia artificial
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // função de custom hook utilizada por meio de desetruturação
  const { getFormData } = useSimulationStorage();

  //função responsável pela requisição à API da inteligência artificial. Necessário o uso do callback, pois temos que colocar essa função como array de dependência do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError("Simulação não encontrada");
        return;
      }

      setInsight(null)
      setError(null);
      setIsLoading(true);

      try {
        const prompt = buildAIPrompt(simulation);
        const data = await getInsight(prompt);
        setInsight(data);
      } catch {
        setError("Erro ao gerar o diagnóstico. Tente novamente.");
      } finally {
        // para de mostrar que está carregando, independente se der erro ou não
        setIsLoading(false);
      }
    },
    [getFormData],
  );

  useEffect(() => {
    // evita loop infinito de requisições para API do Gemini
    if (!id) {
      return;
    }

    const timer = setTimeout(()=>{fetchInsight(id);})
    return ()=>{clearTimeout(timer)}
    

  }, [id, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
