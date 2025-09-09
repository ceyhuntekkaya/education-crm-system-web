import React, { ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  title: string | ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  forceOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  styling?: "default" | "off";
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  isOpen,
  onToggle,
  forceOpen = false,
  className = "",
  titleClassName = "",
  contentClassName = "",
  styling = "default",
}) => {
  const shouldShow = forceOpen || isOpen;

  return (
    <div
      className={`accordion-item ${
        styling === "off" ? "accordion-item--no-style" : ""
      } ${className}`}
    >
      <div
        className={`accordion-header d-flex align-items-center justify-content-between cursor-pointer py-12 ${titleClassName}`}
        onClick={() => !forceOpen && onToggle(id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !forceOpen) {
            e.preventDefault();
            onToggle(id);
          }
        }}
      >
        <div className="text-lg mb-0 fw-semibold">
          {typeof title === "string" ? (
            <h6 className="mb-0">{title}</h6>
          ) : (
            title
          )}
        </div>
        {!forceOpen && (
          <i
            className={`ph-bold ${
              shouldShow ? "ph-caret-up" : "ph-caret-down"
            } text-neutral-500 transition-all duration-500`}
            style={{
              transform: shouldShow ? "rotate(0deg)" : "rotate(0deg)",
            }}
          />
        )}
      </div>

      <div
        className={`accordion-content overflow-hidden transition-all duration-500 ease-in-out`}
        style={{
          maxHeight: shouldShow ? "2000px" : "0px",
          opacity: shouldShow ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          className={`pt-16 ${contentClassName}`}
          data-aos="fade-in"
          data-aos-duration="300"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
  className?: string;
  styling?: "default" | "off";
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className = "",
  styling = "default",
}) => {
  return (
    <div
      className={`accordion ${
        styling === "off" ? "accordion--no-style" : ""
      } ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          return React.cloneElement(child, { styling } as any);
        }
        return child;
      })}
    </div>
  );
};
