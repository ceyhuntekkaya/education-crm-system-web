"use client";
import { useEffect } from "react";
const BootstrapInit = () => {
  useEffect(() => {
    console.warn = () => {};
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);
  return null;
};
export default BootstrapInit;
