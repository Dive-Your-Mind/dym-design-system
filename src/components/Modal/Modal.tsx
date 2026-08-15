import type { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { IconButton } from "../IconButton/IconButton";

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Required — becomes the dialog's accessible name. */
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** Optional element that opens the modal when activated (e.g. a Button). */
  trigger?: ReactNode;
}

/**
 * Modal dialog built on @radix-ui/react-dialog: traps focus while open,
 * closes on Escape or overlay click, and restores focus to the trigger
 * on close.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  trigger,
}: ModalProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="dym-Modal-overlay" />
        <RadixDialog.Content
          className="dym-Modal-content"
          // Radix wires aria-describedby to Description automatically, but
          // warns in dev if Description is absent. When there's no
          // description, opt out by passing the key with an undefined
          // value (Radix checks the prop's *presence*, not its value) —
          // do NOT do this when a description exists, or it overrides the
          // real auto-wired id.
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          <div className="dym-Modal-header">
            <RadixDialog.Title className="dym-Modal-title">{title}</RadixDialog.Title>
            <RadixDialog.Close asChild>
              <IconButton icon={<CloseIcon />} aria-label="Close" size="sm" variant="ghost" />
            </RadixDialog.Close>
          </div>
          {description && (
            <RadixDialog.Description className="dym-Modal-description">
              {description}
            </RadixDialog.Description>
          )}
          <div className="dym-Modal-body">{children}</div>
          {footer && <div className="dym-Modal-footer">{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
