import { ComponentProps } from 'react';

import { Tooltip } from './Tooltip';

export interface StackblitzLinkProps extends ComponentProps<'button'> {
  files: Record<string, { content: string; isBinary: boolean }>;
  template?: string;
}

export const StackblitzLink = ({
  files,
  template = 'typescript',
  className = '',
  ...props
}: StackblitzLinkProps) => {
  return (
    <form action="https://stackblitz.com/run" method="POST" target="_blank">
      <input type="hidden" name="project[title]" value="Joymap Example" />
      <input type="hidden" name="project[template]" value={template} />
      {Object.entries(files).map(([path, file]) =>
        !file.isBinary ? (
          <input key={path} type="hidden" name={`project[files][${path}]`} value={file.content} />
        ) : null,
      )}
      <Tooltip content="Edit example on stackblitz">
        <button
          type="submit"
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
    </form>
  );
};
