import type { ReactNode } from 'react';

interface IframeCardProps {
  children: ReactNode;
  path?: string;
}

export function IframeCard({ children, path }: IframeCardProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary">
      {path && (
        <div className="flex items-center border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{path}</span>
        </div>
      )}
      <div className="min-h-0 w-full flex-1">{children}</div>
    </div>
  );
}
