import { Divider } from "./Divider";

// Utiliza uma classe nativa do React para tipar as props do componente de input, estendendo as propriedades padrão de um elemento de input HTML. Além disso, adiciona duas propriedades opcionais, `prefix` e `sufix`, que permitem adicionar texto ou elementos antes ou depois do campo de entrada, respectivamente. Isso é útil para criar inputs personalizados com elementos adicionais, como ícones ou unidades de medida.
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Por vezes terá um prefixo, como um "R$" para indicar valor monetário
  prefix?: string;
  // Por vezes terá um sufixo, como "meses" para indicar tempo
  sufix?: string;
}

export function Input({ prefix, sufix, ...rest }: InputProps) {
  return (
    <div className="bg-input flex items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
        {/* Caso tenha sido passado um prefixo, ele será exibido antes do campo de entrada */}
      {prefix && (
        <>
          <span className="text-muted-foreground text-sm font-medium">
            {prefix}
          </span>
          <Divider orientation="vertical" />
        </>
      )}
      <input
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none autofocus"
        {...rest}
      />
      {/* Caso tenha sido passado um sufixo, ele será exibido depois do campo de entrada */}
      {sufix && (
        <>
          <Divider orientation="vertical" />
          <span className="text-muted-foreground ml-3 text-sm font-medium">
            {sufix}
          </span>
        </>
       )}
    </div>
  );
}
