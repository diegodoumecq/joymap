import { ComponentProps, forwardRef, ReactNode } from 'react';

export interface LinkProps extends ComponentProps<'a'> {
  isActive?: boolean;
  children: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ isActive, children, className = '', ...props }, ref) => (
    <a
      ref={ref}
      className={`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${className}`}
      {...props}
    >
      {children}
    </a>
  ),
);

Link.displayName = 'Link';
