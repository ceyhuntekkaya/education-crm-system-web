import { useState } from "react";

/**
 * Step API loading states
 */
export const useRegisterApiSteps = () => {
  const [isLoading] = useState(false);

  return {
    isLoading,
  };
};
