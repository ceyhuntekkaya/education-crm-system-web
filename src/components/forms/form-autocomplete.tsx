"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFormField } from "@/contexts";

type FormAutocompleteVariant = "inline" | "outline" | "primary";

interface AutocompleteOption {
  value: string;
  label: string;
}

interface FormAutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  variant?: FormAutocompleteVariant;
  options: AutocompleteOption[];
  iconLeft?: string;
  iconRight?: string;
  filterFunction?: (
    options: AutocompleteOption[],
    searchTerm: string
  ) => AutocompleteOption[];
  maxResults?: number;
  noOptionsText?: string;
  loadingText?: string;
  isLoading?: boolean;
}

export const FormAutocomplete: React.FC<FormAutocompleteProps> = ({
  id,
  name,
  placeholder,
  label,
  variant = "primary",
  options = [],
  className,
  disabled = false,
  iconLeft,
  iconRight,
  filterFunction,
  maxResults = 10,
  noOptionsText = "Sonuç bulunamadı",
  loadingText = "Yükleniyor...",
  isLoading = false,
  ...rest
}) => {
  const { value, error, required, onChange } = useFormField(name);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default filter function
  const defaultFilterFunction = useCallback(
    (opts: AutocompleteOption[], search: string): AutocompleteOption[] => {
      return opts
        .filter(
          (option) =>
            option.label.toLowerCase().includes(search.toLowerCase()) ||
            option.value.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, maxResults);
    },
    [maxResults]
  );

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions(options.slice(0, maxResults));
    } else {
      const filterFunc = filterFunction || defaultFilterFunction;
      const filtered = filterFunc(options, searchTerm);
      setFilteredOptions(filtered);
    }
    setHighlightedIndex(-1);
  }, [searchTerm, options, filterFunction, maxResults, defaultFilterFunction]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);

    // Sadece valid seçeneklerden birini yazdıysa value'yu set et
    // Aksi halde value'yu boş bırak (select mantığı)
    const exactMatch = options.find(
      (opt) => opt.label.toLowerCase() === newValue.toLowerCase()
    );
    if (exactMatch) {
      onChange(exactMatch.value);
    } else {
      onChange("");
    }
  };

  // Handle dropdown close - validate input
  const handleDropdownClose = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);

    // Dropdown kapandığında, eğer yazılan metin geçerli bir seçenek değilse temizle
    if (searchTerm) {
      const exactMatch = options.find(
        (opt) => opt.label.toLowerCase() === searchTerm.toLowerCase()
      );
      if (!exactMatch) {
        // Geçersiz metin yazılmış, temizle
        setSearchTerm("");
        onChange("");
      }
    }
  }, [searchTerm, options, onChange]);

  // Handle option selection
  const handleOptionSelect = (option: AutocompleteOption) => {
    setSearchTerm(option.label);
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    // Input'tan focus'u kaldır ki dropdown tamamen kapansın
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        handleDropdownClose();
        inputRef.current?.blur();
        break;
      case "Tab":
        handleDropdownClose();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleDropdownClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleDropdownClose]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  // Variant bazlı stil sınıfları
  const getVariantClasses = (): string => {
    const baseClasses = "rounded-pill outline-0 w-100 h-48";
    const leftPadding = iconLeft ? "ps-60" : "px-16";
    const rightPadding = iconRight ? "pe-60" : "";

    switch (variant) {
      case "inline":
        return `${baseClasses} common-input bg-main-25 ${
          iconLeft ? "ps-48" : ""
        } ${iconRight ? "pe-48" : ""} border-neutral-30`;
      case "outline":
        return `${baseClasses} bg-white text-black border border-transparent focus-border-main-600 ${leftPadding} ${rightPadding}`;
      default:
        return `${baseClasses} common-input ${iconLeft ? "ps-48" : ""} ${
          iconRight ? "pe-48" : ""
        } border-transparent focus-border-main-600`;
    }
  };

  // Display value - show search term if input is focused, otherwise show selected label
  const displayValue = React.useMemo(() => {
    // Eğer dropdown açıksa arama terimini göster
    if (isOpen) {
      return searchTerm;
    }

    // Dropdown kapalıysa seçili değerin label'ını göster
    if (typeof value === "string" && value !== "") {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : value;
    }

    return searchTerm;
  }, [value, options, searchTerm, isOpen]);

  // Update search term when value changes externally
  useEffect(() => {
    if (typeof value === "string" && value !== "") {
      const selectedOption = options.find((opt) => opt.value === value);
      if (selectedOption && selectedOption.label !== searchTerm) {
        setSearchTerm(selectedOption.label);
      }
    }
  }, [value, options, searchTerm]);

  return (
    <div className={className} ref={containerRef}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-neutral-700 text-lg fw-medium mb-12"
        >
          {label}
        </label>
      )}
      <div className="position-relative">
        <div className={iconLeft || iconRight ? "position-relative" : ""}>
          <input
            ref={inputRef}
            id={id || name}
            name={name}
            type="text"
            className={getVariantClasses()}
            placeholder={placeholder}
            disabled={disabled}
            value={displayValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsOpen(true);
              // Eğer input'ta seçili bir değer varsa ve o değerle eşleşen option varsa, arama terimini temizle
              if (
                searchTerm &&
                options.find((opt) => opt.label === searchTerm)
              ) {
                setSearchTerm("");
              }
            }}
            required={required}
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls={`${id || name}-listbox`}
            {...rest}
          />
          {iconLeft && (
            <span
              className={`${
                variant === "outline"
                  ? "bg-white text-neutral-200 border border-main-25 border-4 w-48 h-48 text-2xl"
                  : "bg-main-600 hover-bg-main-700 text-white w-36 h-36 text-md ms-8"
              } rounded-circle flex-center position-absolute top-50 translate-middle-y inset-inline-start-0`}
            >
              <i className={`ph-bold ${iconLeft}`} />
            </span>
          )}
          {iconRight && (
            <span
              className={`${
                variant === "outline"
                  ? "bg-white text-neutral-200 border border-main-25 border-4 w-48 h-48 text-2xl"
                  : "bg-main-600 hover-bg-main-700 text-white w-36 h-36 text-md me-8"
              } rounded-circle flex-center position-absolute top-50 translate-middle-y inset-inline-end-0`}
            >
              <i className={`ph-bold ${iconRight}`} />
            </span>
          )}
          {/* Dropdown indicator */}
          <span
            className={`position-absolute top-50 translate-middle-y inset-inline-end-0 ${
              iconRight ? "me-56" : "me-16"
            } text-neutral-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }}
          >
            <i className="ph-bold ph-caret-down"></i>
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="form-autocomplete-dropdown">
            {isLoading ? (
              <div className="form-autocomplete-loading">
                <i className="ph-bold ph-spinner ph-spin"></i>
                {loadingText}
              </div>
            ) : filteredOptions.length > 0 ? (
              <div className="form-autocomplete-results">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={`form-autocomplete-option ${
                      index === highlightedIndex ? "highlighted" : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            ) : (
              <div className="form-autocomplete-no-options">
                {noOptionsText}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <div className="text-danger-600 text-sm mt-8">{error}</div>}
    </div>
  );
};
