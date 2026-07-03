import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importe seus componentes compartilhados, como Button, se houver.

interface Simulation {
  id: string;
  renda: number;
  // adicione os outros campos necessários da sua tipagem
}

export default function SimulationHistoryPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Busque a string do localStorage
    // 2. Converta com JSON.parse (lembre-se de tratar caso retorne null ou dê erro)
    // 3. Atualize o estado simulations
  }, []);

  // Se não houver simulações
  if (simulations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Nenhum histórico encontrado</h2>
        <p className="text-muted-foreground mb-6">Que tal fazer o seu primeiro planejamento financeiro agora?</p>
        <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
          Iniciar Simulação
        </button>
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
          <div key={sim.id} className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between">
            <div>
              {/* Resumo dos dados: Renda, Gastos, Nome da Meta */}
              <h3 className="font-semibold text-lg mb-2">Meta: {/* Nome da meta aqui */}</h3>
              <p className="text-sm text-muted-foreground">Renda: {/* Renda formatada aqui */}</p>
            </div>
            
            <div className="mt-6 flex justify-between gap-4">
              {/* Botões de Ação */}
              <button className="text-red-500 hover:underline">
                Excluir
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}