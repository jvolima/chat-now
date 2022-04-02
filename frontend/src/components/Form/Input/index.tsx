import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  error?: FieldError; 
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  type,
  placeholder,
  error,
  ...rest
}, ref) => {
  return (
    <Container>
      <input 
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {
        error && (
          <span>
            {error.message}
          </span>
        )
      }
    </Container>
  )
}

export const Input = forwardRef(InputComponent);