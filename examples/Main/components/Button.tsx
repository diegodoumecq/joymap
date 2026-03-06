import { ComponentProps, ReactNode } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  isActive?: boolean;
  children: ReactNode;
}

export const Button = ({ isActive, children, className = '', ...props }: ButtonProps) => (
  <button
    type="button"
    aria-selected={isActive}
    className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap uppercase transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

