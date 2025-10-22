"use client";

import { useEffect } from "react";
import { useSnackbar } from "@/contexts/snackbar-context";
import { snackbarService } from "@/lib/snackbar-service";

export default function SnackbarInitializer() {
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // Connect snackbarService to the context
    snackbarService.setCallback((message, type) => {
      showSnackbar(message, type);
    });
  }, [showSnackbar]);

  return null;
}
