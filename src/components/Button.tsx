import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
  onClick: () => void;
  children?: ReactNode;
  width?: string;
  variant: 'solid' | 'outline';
};
function Button({ width = 'w-full', children, variant, className, onClick }: Props) {
  const styles = {
    solid: `h-10  'w-full' ${width}  bg-PRIMARY rounded-lg font-semibold text-BACKGROUND ${className}`,
    outline: `h-10 w-full border-2 border-PRIMARY rounded-lg font-semibold text-PRIMARY ${
      className
    }`,
  };

  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
