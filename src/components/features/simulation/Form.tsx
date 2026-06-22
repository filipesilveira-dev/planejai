import { StepProgress } from "./Progress.tsx";
import { FormStep } from "./FormStep.tsx";
import { PiggyBank } from "lucide-react";

export function SimulationForm() {
  return (
    <>
      {/* Valores passados via props indicando o passo atual e o número total de passos */}
      <StepProgress currentStep={2} totalSteps={5} />
      <FormStep
        icon={PiggyBank}
        title="Título do Passo"
        question="Pergunta ou instrução relacionada ao passo atual"
        inputProps={{
          type: "text",
          placeholder: "ex: 5.000,00",
          prefix: "R$",
          sufix: "meses",
        }}
      />
    </>
  );
}
