// Componente filho de Form.tsx, responsável por exibir o conteúdo de cada passo do formulário, incluindo um ícone, título e pergunta ou instrução relacionada ao passo atual. Ele recebe as seguintes props:
// - `icon`: um componente de ícone do Lucide que representa visualmente o passo atual.
// - `title`: uma string que serve como título do passo, geralmente em letras maiúsculas e com um estilo específico.
// - `question`: uma string que contém a pergunta ou instrução relacionada ao passo atual, exibida em um estilo de texto maior e mais destacado.
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Input, type InputProps } from "../../shared/Input";
import { Button } from "../../shared/Button";

interface FormStepProps {
  icon: LucideIcon;
  title: string;
  question: string;
  inputProps: InputProps; // Adicionei a propriedade inputProps para passar as props do Input
  submitButtonProps?: {
    label: string;
    emojiIcon?: string;
  };
}

export function FormStep({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
}: FormStepProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
        {title}
      </h2>
      <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
        {question}
      </h3>
      <form className="flex flex-col gap-4">
        <Input {...inputProps} />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Button
              type="button"
              //onClick={onBack}
              variant="ghost"
              icon={ArrowLeft}
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={!submitButtonProps ? ArrowRight : undefined}
              className="order-1 flex-1 sm:order-2"
            >
              {submitButtonProps?.label ?? "Próximo"}
              {submitButtonProps?.emojiIcon}
            </Button>
        </div>
      </form>
    </div>
  );
}
