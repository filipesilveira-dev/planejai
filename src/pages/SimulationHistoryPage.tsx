import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/shared/Button";
import type { SimulationRecord } from "../data/simulation";


const LOCAL_STORAGE_KEY = "simulation-data";

export function SimulationHistoryPage() {
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);
  const navigate = useNavigate();

  // Com a lógica da função dentro de useEffect, o problema de renderização em cascata é resolvido em caso de operações assíncronas
  useEffect(() => {
    const getFormDataHistory = () => {
      // 1. Busque a string do localStorage
      const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
      const savedData = storage
        ? (JSON.parse(storage) as SimulationRecord[])
        : // Se não existir (storage é nulo): Inicializa a variável savedData como um array vazio []
          [];
      setSimulations(savedData);
    };
    getFormDataHistory();
  }, []);

  // Se não houver simulações
  if (simulations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Nenhum histórico encontrado
        </h2>
        <p className="text-muted-foreground mb-6">
          Que tal fazer o seu primeiro planejamento financeiro agora?
        </p>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium cursor-pointer"
        >
          Iniciar Simulação
        </Button>
      </div>
    );
  }

  // Se houver simulações, renderiza o grid
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Suas Simulações</h1>

      {/* Grid responsivo do Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulations.map((sim) => (
          <div
            key={sim.id}
            className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              {/* Resumo dos dados: Renda, Gastos, Nome da Meta */}
              <h3 className="font-semibold text-lg mb-2">
                Meta: {sim.goalName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Renda: R$ {sim.income} reais
              </p>
               <p className="text-sm text-muted-foreground">
                Custos fixos: R$ {sim.expenses} reais
              </p>
               <p className="text-sm text-muted-foreground">
                Custo da meta: R$ {sim.goalAmount} reais
              </p>
            </div>

            <div className="mt-6 flex justify-between gap-4">
              {/* Botões de Ação */}
              <Button variant="ghost" className="text-red-500 hover:underline">
                Excluir
              </Button>
              <Button
              onClick={()=>{void navigate(`/resultado/${sim.id}`)}}
                variant="primary"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
              >
                Ver detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
