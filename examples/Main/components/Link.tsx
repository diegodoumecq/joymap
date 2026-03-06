import { ComponentProps, ReactNode } from 'react';

export interface LinkProps extends ComponentProps<'a'> {
  isActive?: boolean;
  children: ReactNode;
}

export const Link = ({ isActive, children, className = '', ...props }: LinkProps) => (
  <a
    className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-colors hover:bg-primary/35 ${className}`}
    {...props}
  >
    {children}
  </a>
);

