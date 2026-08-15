import type { ReactElement } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export interface TooltipProps {
  content: string;
  children: ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

/** Hover/focus label for supplementary information, built on @radix-ui/react-tooltip. */
export function Tooltip({ content, children, side = "top", delayDuration = 200 }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className="dym-Tooltip-content" side={side} sideOffset={6}>
            {content}
            <RadixTooltip.Arrow className="dym-Tooltip-arrow" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
