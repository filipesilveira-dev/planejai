import { useCallback, useEffect, useRef, useState } from "react";
import { useSimulationStorage } from "./useSimulationStorage";
import type { InsightData } from "../services/aiService";
import { buildAIPrompt } from "../data/iaPrompt";
import { getInsight } from "../services/aiService";
import type { SimulationRecord } from "../data/simulation";

export const useInsight = (id: string) => {
  // função de custom hook utilizada por meio de desetruturação
  const { getFormData, updateSimulation } = useSimulationStorage();
  // recebe os dados já formatados da API do Gemini. Ao invés de ser nicializado como null, indicando que ainda não foi feita a requisição à inteligÊncia artificial, é inicializado com uma função que verifica uma condição e retorna um valor "simulation.data", caso existam dados salvos no localStorage, ou null, caso não exista. Essa técnica se chama "Lazy state initialization". Melhora a performance uma vez que o react só leia o localStorage apenas uma vez na montegem inicial.
  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id);

    // "simulation?" pois pode ser nulo
    if (simulation?.insight) {
      // retorna a propriedade insight dentro do localStorage
      return simulation.insight;
    }

    return null;
  });

  const isRequestPending = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //função responsável pela requisição à API da inteligência artificial. Necessário o uso do callback, pois temos que colocar essa função como array de dependência do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError("Simulação não encontrada");
        return;
      }

      //setInsight(null)
      // outras requisições só devem ser feitas após a atual (pendente) finalizar
      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const data = await getInsight(prompt);
        setInsight(data);

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord);
      } catch {
        setError("Erro ao gerar o diagnóstico. Tente novamente.");
      } finally {
        // indica que a requisição finalizou e que outras podem ser feitas
        isRequestPending.current = false;
        // para de mostrar que está carregando, independente se der erro ou não
        setIsLoading(false);
      }
    },
    [getFormData, updateSimulation],
  );

  useEffect(() => {
    // evita loop infinito de requisições para API do Gemini e requisições dobradas na fase de desenvolvimento
    if (insight || isLoading || error || isRequestPending.current) {
      return;
    }

    // const timer = setTimeout(()=>{fetchInsight(id);})
    // return ()=>{clearTimeout(timer)}
    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
