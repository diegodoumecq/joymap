import { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipProvider = ({ children }: { children: ReactNode }) => (
  <TooltipPrimitive.Provider delayDuration={200}>{children}</TooltipPrimitive.Provider>
);

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => (
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className="z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
        sideOffset={5}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-secondary" width={8} height={4} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
);
