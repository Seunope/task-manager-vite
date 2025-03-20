import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
  onClick: () => void;
  children?: ReactNode;
  width?: string;
  // variant: 'solid' | 'outline';
};
function Button({ width = 'w-full', children, className, onClick }: Props) {
  const styles = `${width} flex justify-center py-2 px-4  border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-blue-1 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
    className
  }`;
  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
