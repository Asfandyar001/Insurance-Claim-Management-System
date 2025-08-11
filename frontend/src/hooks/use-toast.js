import { useCallback } from "react";

export function useToast() {
  const toast = useCallback(({ title, description, variant = "default" }) => {
    // This is a super simple placeholder toast.
    // You can swap this for a UI library like Sonner, Radix, or shadcn.
    alert(`${title}\n${description || ""}`);
  }, []);

  return { toast };
}
