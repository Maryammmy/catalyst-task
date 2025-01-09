import { InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ ...rest }: IProps) {
  return <input type="text" {...rest} />;
}

export default Input;
