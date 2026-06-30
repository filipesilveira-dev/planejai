import { useInsight } from "../../../hooks/useInght"

interface AIInsightProps{
    simulationId: string
}

export function AIInsight({simulationId}: AIInsightProps){
    const {insight} = useInsight(simulationId)
    console.log(insight)

    return(
        <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lag:col-span-2">
            Painel de Insight
        </div>
    )
}