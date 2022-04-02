import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export function Button({ name, ...rest }: ButtonProps) {
  return (
    <Container type="submit" {...rest}>
      {name}
    </Container>
  )
}