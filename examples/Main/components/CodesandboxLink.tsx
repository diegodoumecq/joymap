import { ComponentProps } from 'react';

export interface CodesandboxLinkProps extends ComponentProps<'button'> {
  value: string;
}

export const CodesandboxLink = ({ value, className = '', ...props }: CodesandboxLinkProps) => (
  <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
    <input type="hidden" name="parameters" value={value} />
    <button
      type="submit"
      className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-colors hover:bg-primary/35 ${className}`}
      {...props}
    >
      <img src="/assets/codesandbox.svg" />
      <span>Edit on codesandbox</span>
    </button>
  </form>
);

