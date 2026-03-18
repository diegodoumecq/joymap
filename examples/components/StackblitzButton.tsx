import { ComponentProps } from 'react';
import StackBlitzSDK from '@stackblitz/sdk';

import { Tooltip } from './Tooltip';

export interface StackblitzLinkProps extends ComponentProps<'button'> {
  files: Record<string, string>;
  title?: string;
}

export const StackblitzButton = ({
  files,
  title = 'Joymap Example',
  className = '',
  ...props
}: StackblitzLinkProps) => {
  const handleClick = () => {
    StackBlitzSDK.openProject(
      {
        title,
        template: 'node',
        files,
      },
      { newWindow: true },
    );
  };

  return (
    <Tooltip content="Edit example on stackblitz">
      <button
        type="button"
        onClick={handleClick}
        className={`flex cursor-pointer items-center rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary ${className}`}
        {...props}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
          <path
            d="M7.398 9.091h-3.58L10.364 2 8.602 6.909h3.58L5.636 14l1.762-4.909Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </Tooltip>
  );
};
