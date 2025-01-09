import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...rest }: IProps) {
  return <button {...rest}>{children}</button>;
}

export default Button;
