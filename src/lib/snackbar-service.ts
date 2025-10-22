import { SnackbarType } from "@/contexts/snackbar-context";

type SnackbarCallback = (message: string, type: SnackbarType) => void;

class SnackbarService {
  private callback: SnackbarCallback | null = null;

  setCallback(callback: SnackbarCallback) {
    this.callback = callback;
  }

  show(message: string, type: SnackbarType) {
    if (this.callback) {
      this.callback(message, type);
    }
  }

  success(message: string) {
    this.show(message, "success");
  }

  error(message: string) {
    this.show(message, "error");
  }

  warning(message: string) {
    this.show(message, "warning");
  }

  info(message: string) {
    this.show(message, "info");
  }
}

export const snackbarService = new SnackbarService();
