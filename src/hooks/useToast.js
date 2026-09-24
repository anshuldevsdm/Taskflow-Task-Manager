import { useCallback, useRef, useState } from "react";

export const TOAST_TYPES = Object.freeze({
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
});

export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id ? { ...toast, leaving: true } : toast,
      ),
    );

    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
    }

    timers.current.set(id, setTimeout(() => removeToast(id), 260));
  }, [removeToast]);

  const showToast = useCallback(
    (title, detail = "Your workspace has been updated.", type = TOAST_TYPES.SUCCESS) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, title, detail, type, leaving: false }]);
      timers.current.set(id, setTimeout(() => dismissToast(id), 2000));
    },
    [dismissToast],
  );

  return { toasts, showToast, removeToast: dismissToast };
};
