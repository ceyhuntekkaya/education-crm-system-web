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
  helperText?: string; // Yardımcı metin
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
  multiple?: boolean; // Çoklu seçim desteği
}

export const FormAutocomplete: React.FC<FormAutocompleteProps> = ({
  id,
  name,
  placeholder,
  label,
  variant = "primary",
  helperText,
  options = [],
  className,
  disabled = false,
  iconLeft,
  iconRight,
  filterFunction,
  maxResults = 1000000,
  noOptionsText = "Sonuç bulunamadı",
  loadingText = "Yükleniyor...",
  isLoading = false,
  multiple = false, // Çoklu seçim varsayılan olarak kapalı
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

  // Get selected values for multiple mode
  const selectedValues = React.useMemo(() => {
    if (!multiple) return [];
    return Array.isArray(value) ? value : value ? [value] : [];
  }, [value, multiple]);

  // Türkçe karakterleri normalize etme fonksiyonu
  const normalizeTurkish = useCallback((text: string): string => {
    const turkishCharMap: { [key: string]: string } = {
      ç: "c",
      Ç: "c",
      ğ: "g",
      Ğ: "g",
      ı: "i",
      I: "i",
      İ: "i",
      i: "i",
      ö: "o",
      Ö: "o",
      ş: "s",
      Ş: "s",
      ü: "u",
      Ü: "u",
    };

    return text
      .split("")
      .map((char) => turkishCharMap[char] || char.toLowerCase())
      .join("");
  }, []);

  // Default filter function
  const defaultFilterFunction = useCallback(
    (opts: AutocompleteOption[], search: string): AutocompleteOption[] => {
      const normalizedSearch = normalizeTurkish(search);

      return opts
        .filter((option) => {
          const normalizedLabel = normalizeTurkish(option.label);
          const normalizedValue = normalizeTurkish(option.value);

          return (
            normalizedLabel.includes(normalizedSearch) ||
            normalizedValue.includes(normalizedSearch)
          );
        })
        .slice(0, maxResults);
    },
    [maxResults, normalizeTurkish]
  );

  // Filter options based on search term
  useEffect(() => {
    let baseOptions = options;

    // Multiple modda seçili olanları filtreleme (opsiyonel - istersen yoruma alabilirsin)
    // if (multiple && selectedValues.length > 0) {
    //   baseOptions = options.filter(opt => !selectedValues.includes(opt.value));
    // }

    // Eğer seçili bir değer varsa, her zaman tüm seçenekleri göster (arama yaparken bile)
    if (!multiple && value && typeof value === "string" && value !== "") {
      setFilteredOptions(baseOptions);
    } else {
      // Seçili değer yoksa normal filtreleme mantığı
      if (searchTerm.trim() === "") {
        setFilteredOptions(baseOptions.slice(0, maxResults));
      } else {
        const filterFunc = filterFunction || defaultFilterFunction;
        const filtered = filterFunc(baseOptions, searchTerm);
        setFilteredOptions(filtered);
      }
    }
    setHighlightedIndex(-1);
  }, [
    searchTerm,
    options,
    filterFunction,
    maxResults,
    defaultFilterFunction,
    value,
    multiple,
    selectedValues,
  ]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || isLoading) return;

    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);

    // Multiple modda input değeri form value'yu etkilemez
    if (multiple) {
      return;
    }

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

    // Multiple modda dropdown kapandığında arama terimini temizle
    if (multiple) {
      setSearchTerm("");
      return;
    }

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
  }, [searchTerm, options, onChange, multiple]);

  // Handle clear/reset
  const handleClear = () => {
    if (disabled || isLoading) return;

    setSearchTerm("");
    onChange(multiple ? [] : "");
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle option selection
  const handleOptionSelect = (option: AutocompleteOption) => {
    if (disabled || isLoading) return;

    if (multiple) {
      // Çoklu seçim modu
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const isSelected = currentValues.includes(option.value);

      let newValues: string[];
      if (isSelected) {
        // Seçili ise kaldır
        newValues = currentValues.filter((v) => v !== option.value);
      } else {
        // Seçili değilse ekle
        newValues = [...currentValues, option.value];
      }

      onChange(newValues);
      setSearchTerm(""); // Arama terimini temizle
      inputRef.current?.focus(); // Input'u focus'ta tut
    } else {
      // Tekli seçim modu (mevcut davranış)
      setSearchTerm(option.label);
      onChange(option.value);
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || isLoading) return;

    // Backspace ile temizleme - eğer seçili bir değer varsa ve input boş değilse
    if (e.key === "Backspace" && value && searchTerm === "") {
      e.preventDefault();
      handleClear();
      return;
    }

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

    // Enhanced disabled styling
    const disabledClasses =
      disabled || isLoading
        ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-75 placeholder-neutral-300 form-control form-autocomplete-disabled"
        : "";

    // Error border styling
    const errorBorderClass = error ? "border-danger-600 border" : "";
    const errorTextClass = error
      ? "text-danger-600 placeholder-danger-600"
      : "";

    switch (variant) {
      case "inline":
        return `${baseClasses} common-input border ${
          disabled || isLoading ? disabledClasses : "bg-main-25"
        } ${iconLeft ? "ps-48" : ""} ${iconRight ? "pe-48" : ""} ${
          disabled || isLoading
            ? ""
            : error
            ? `${errorBorderClass} ${errorTextClass}`
            : "border-neutral-30"
        }`;
      case "outline":
        return `${baseClasses} ${
          disabled || isLoading ? disabledClasses : "bg-white text-black"
        } border ${
          disabled || isLoading
            ? ""
            : error
            ? `${errorBorderClass} ${errorTextClass}`
            : "border-transparent focus-border-main-600"
        } ${leftPadding} ${rightPadding}`;
      default:
        return `${baseClasses} common-input border ${iconLeft ? "ps-48" : ""} ${
          iconRight ? "pe-48" : ""
        } ${
          disabled || isLoading
            ? disabledClasses
            : error
            ? `${errorBorderClass} ${errorTextClass}`
            : "border-transparent focus-border-main-600"
        }`;
    }
  };

  // Display value - show search term if input is focused, otherwise show selected label
  const displayValue = React.useMemo(() => {
    // Multiple modda sadece arama terimini göster
    if (multiple) {
      return searchTerm;
    }

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
  }, [value, options, searchTerm, isOpen, multiple]);

  // Check if we have a selected value for showing clear button
  const hasSelectedValue = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) && value.length > 0;
    }
    return typeof value === "string" && value !== "" && !isOpen;
  }, [value, isOpen, multiple]);

  // Get selected options for display
  const selectedOptions = React.useMemo(() => {
    if (!multiple) return [];
    return options.filter((opt) => selectedValues.includes(opt.value));
  }, [options, selectedValues, multiple]);

  // Remove a selected item in multiple mode
  const handleRemoveItem = (valueToRemove: string) => {
    if (disabled || isLoading || !multiple) return;
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    onChange(newValues);
  };

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

      {/* Multiple mode: Show selected items as chips */}
      {multiple && selectedOptions.length > 0 && (
        <div className="d-flex flex-wrap gap-8 mb-12">
          {selectedOptions.map((option) => (
            <div
              key={option.value}
              className="badge bg-main-600 text-white d-inline-flex align-items-center gap-2 px-12 py-6 rounded-pill"
            >
              <span>{option.label}</span>
              <button
                type="button"
                className="btn-close btn-close-white ms-8"
                style={{ fontSize: "10px", opacity: 0.8 }}
                onClick={() => handleRemoveItem(option.value)}
                disabled={disabled || isLoading}
                aria-label={`${option.label} kaldır`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="position-relative">
        <div className={iconLeft || iconRight ? "position-relative" : ""}>
          <input
            ref={inputRef}
            id={id || name}
            name={name}
            type="text"
            className={getVariantClasses()}
            placeholder={
              multiple && selectedOptions.length > 0
                ? `${selectedOptions.length} öğe seçildi`
                : placeholder
            }
            disabled={disabled || isLoading}
            value={displayValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (disabled || isLoading) return;
              setIsOpen(true);
              // Eğer input'ta seçili bir değer varsa ve o değerle eşleşen option varsa, arama terimini temizle
              if (
                !multiple &&
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
          {/* Clear button - sadece seçili değer varsa göster */}
          {hasSelectedValue && !multiple && (
            <span
              className={`position-absolute play-button top-50 translate-middle-y inset-inline-end-0 ${
                iconRight ? "me-100" : "me-40"
              } text-neutral-400 hover-text-danger-600 cursor-pointer transition-colors`}
              onClick={handleClear}
              title="Temizle"
            >
              <i className="ph-bold ph-x"></i>
            </span>
          )}

          {/* Clear all button for multiple mode */}
          {hasSelectedValue && multiple && (
            <span
              className={`position-absolute play-button top-50 translate-middle-y inset-inline-end-0 ${
                iconRight ? "me-100" : "me-40"
              } text-neutral-400 hover-text-danger-600 cursor-pointer transition-colors`}
              onClick={handleClear}
              title="Tümünü Temizle"
            >
              <i className="ph-bold ph-x-circle"></i>
            </span>
          )}

          {/* Dropdown indicator */}
          <span
            className={`position-absolute top-50 translate-middle-y inset-inline-end-0 ${
              iconRight ? "me-56" : "me-16"
            } transition-transform ${isOpen ? "rotate-180" : ""} ${
              disabled || isLoading
                ? "text-neutral-300 opacity-50 cursor-not-allowed"
                : "text-neutral-400 cursor-pointer hover:text-neutral-600"
            }`}
            onClick={() => {
              if (disabled || isLoading) return;
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }}
          >
            {isLoading ? (
              <i className="ph-bold ph-spinner ph-spin"></i>
            ) : (
              <i className="ph-bold ph-caret-down"></i>
            )}
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="form-autocomplete-dropdown">
            {isLoading ? (
              <div className="form-autocomplete-loading">
                <i className="ph-bold ph-spinner ph-spin"></i>
                {loadingText}
              </div>
            ) : filteredOptions.length > 0 ? (
              <div className="form-autocomplete-results">
                {filteredOptions.map((option, index) => {
                  const isSelected =
                    multiple && selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={`form-autocomplete-option ${
                        index === highlightedIndex ? "highlighted" : ""
                      } ${isSelected ? "selected" : ""}`}
                      onClick={() => handleOptionSelect(option)}
                      role="option"
                      aria-selected={index === highlightedIndex}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onMouseLeave={() => setHighlightedIndex(-1)}
                    >
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="form-check-input me-8"
                          style={{ pointerEvents: "none" }}
                        />
                      )}
                      {option.label}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="form-autocomplete-no-options">
                {noOptionsText}
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="text-danger-600 text-sm mt-8 ps-24">{error}</div>
      )}
      {helperText && !error && (
        <small className="text-muted d-block mt-8 ps-24">{helperText}</small>
      )}
    </div>
  );
};
