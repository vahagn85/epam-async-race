import type { ReactNode, JSX } from 'react';

interface HeadingProps {
  level?: number;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  children: ReactNode;
  className?: string;
}

function Heading({
  level = 1,
  size = 'xl',
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeStyles: Record<string, string> = {
    xl: 'text-3xl mb-4',
    lg: 'text-2xl mb-3',
    md: 'text-xl mb-2',
    sm: 'text-lg mb-2',
  };
  return <Tag className={`${sizeStyles[size]} ${className}`}>{children}</Tag>;
}

export default Heading;
