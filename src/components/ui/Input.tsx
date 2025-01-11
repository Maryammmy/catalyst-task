import { InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ ...rest }: IProps) {
  return <input {...rest} />;
}

export default Input;
