import { Icon } from "./Icon";
import { TOAST_TYPES } from "../../hooks/useToast";

const ICONS = {
  [TOAST_TYPES.SUCCESS]: "check",
  [TOAST_TYPES.WARNING]: "alert",
  [TOAST_TYPES.DANGER]: "trash",
};

export function ToastRegion({ toasts, onDismiss }) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <button
          className={`toast toast-${toast.type ?? TOAST_TYPES.SUCCESS} ${toast.leaving ? "out" : ""}`}
          key={toast.id}
          type="button"
          onClick={() => onDismiss(toast.id)}
        >
          <span className="toast-icon"><Icon name={ICONS[toast.type ?? TOAST_TYPES.SUCCESS] ?? "check"} /></span>
          <span className="toast-copy">
            <strong>{toast.title}</strong>
            <span>{toast.detail}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
