import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
};

export default function Button({ variant = "solid", ...props }: Props) {
  return <button className={`btn btn--${variant}`} {...props} />;
}