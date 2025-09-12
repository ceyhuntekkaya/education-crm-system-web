import { useState, useCallback } from "react";

interface UseAccordionProps {
  defaultOpen?: string[];
  allowMultiple?: boolean;
}

export const useAccordion = ({
  defaultOpen = [],
  allowMultiple = true,
}: UseAccordionProps = {}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = useCallback(
    (itemId: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          if (!allowMultiple) {
            newSet.clear();
          }
          newSet.add(itemId);
        }

        return newSet;
      });
    },
    [allowMultiple]
  );

  const isOpen = useCallback(
    (itemId: string) => {
      return openItems.has(itemId);
    },
    [openItems]
  );

  const openItem = useCallback(
    (itemId: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(itemId);
        return newSet;
      });
    },
    [allowMultiple]
  );

  const closeItem = useCallback((itemId: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  const closeAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  const openAll = useCallback((itemIds: string[]) => {
    setOpenItems(new Set(itemIds));
  }, []);

  return {
    isOpen,
    toggleItem,
    openItem,
    closeItem,
    closeAll,
    openAll,
    openItems: Array.from(openItems),
  };
};
