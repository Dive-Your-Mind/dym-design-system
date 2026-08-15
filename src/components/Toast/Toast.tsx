import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { cx } from "../../utils/cx";

export type ToastVariant = "default" | "success" | "danger" | "warning";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}

export interface ToastProviderProps {
  children: ReactNode;
}

/** Place once near the app root. Descendants call `useToast().toast(...)` to show a toast. */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((options: ToastOptions) => {
    const id = String(nextId.current++);
    setToasts((current) => [...current, { id, ...options }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map(({ id, title, description, variant = "default", duration = 5000 }) => (
          <RadixToast.Root
            key={id}
            className={cx("dym-Toast", `dym-Toast--${variant}`)}
            duration={duration}
            onOpenChange={(open) => {
              if (!open) removeToast(id);
            }}
          >
            <RadixToast.Title className="dym-Toast-title">{title}</RadixToast.Title>
            {description && (
              <RadixToast.Description className="dym-Toast-description">
                {description}
              </RadixToast.Description>
            )}
            <RadixToast.Close className="dym-Toast-close" aria-label="Dismiss">
              ×
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="dym-Toast-viewport" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
