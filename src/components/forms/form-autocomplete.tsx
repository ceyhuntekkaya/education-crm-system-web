"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFormField } from "@/contexts";

// AutoComplete seçeneği tipi
export interface AutoCompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// FormAutoComplete props tipi
interface FormAutoCompleteProps {
  name: string;
  options: AutoCompleteOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  maxSuggestions?: number;
  minInputLength?: number;
  noOptionsText?: string;
  allowCustomValue?: boolean;
  onInputChange?: (value: string) => void;
  onSelect?: (option: AutoCompleteOption) => void;
}

// FormAutoComplete bileşeni
export const FormAutoComplete: React.FC<FormAutoCompleteProps> = ({
  name,
  options,
  placeholder,
  label,
  helperText,
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperClassName = "",
  maxSuggestions = 10,
  minInputLength = 0,
  noOptionsText = "Seçenek bulunamadı",
  allowCustomValue = true,
  onInputChange,
  onSelect,
}) => {
  const { value, error, required, onChange } = useFormField(name);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<AutoCompleteOption[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  // Türkçe karakterler için normalize edilmiş karşılaştırma
  const normalizeText = useCallback((text: string) => {
    return text
      .toLocaleLowerCase("tr-TR") // Türkçe locale ile dönüştür
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c");
  }, []);

  // Input değeri ile seçili değeri senkronize et
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((option) => option.value === value);
      setInputValue(selectedOption ? selectedOption.label : String(value));
    } else {
      setInputValue("");
    }
  }, [value, options]);

  // Seçenekleri filtrele
  const filterOptions = useCallback(
    (searchValue: string) => {
      // Eğer arama değeri boş ise tüm seçenekleri göster
      if (!searchValue || searchValue.length === 0) {
        return options
          .filter((option) => !option.disabled)
          .slice(0, maxSuggestions);
      }

      if (searchValue.length < minInputLength) {
        return [];
      }

      const filtered = options
        .filter(
          (option) =>
            !option.disabled &&
            normalizeText(option.label).includes(normalizeText(searchValue))
        )
        .slice(0, maxSuggestions);

      return filtered;
    },
    [options, minInputLength, maxSuggestions, normalizeText]
  );

  // Input değişikliği
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSelectedIndex(-1);

    // Seçenekleri filtrele
    const filtered = filterOptions(newValue);
    setFilteredOptions(filtered);
    setIsOpen(true); // Her zaman aç

    // Custom değer izni varsa form değerini güncelle
    if (allowCustomValue) {
      onChange(newValue);
    }

    // Callback çağır
    onInputChange?.(newValue);
  };

  // Seçenek seçimi
  const handleOptionSelect = (option: AutoCompleteOption) => {
    setInputValue(option.label);
    setIsOpen(false);
    setSelectedIndex(-1);
    onChange(option.value);
    onSelect?.(option);
  };

  // Klavye navigasyonu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
          handleOptionSelect(filteredOptions[selectedIndex]);
        } else if (allowCustomValue && inputValue.trim()) {
          setIsOpen(false);
          onChange(inputValue.trim());
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Input focus
  const handleFocus = () => {
    const filtered = filterOptions(inputValue);
    setFilteredOptions(filtered);
    setIsOpen(true); // Her zaman aç, boş olsa bile tüm seçenekleri göster
  };

  // Input blur
  const handleBlur = () => {
    // Options listesine tıklama durumunu kontrol et
    setTimeout(() => {
      if (!optionsRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setSelectedIndex(-1);

        // Eğer custom değer izni yoksa ve geçerli bir seçenek yoksa, input'u temizle
        if (!allowCustomValue && inputValue) {
          const foundOption = options.find(
            (option) => option.label.toLowerCase() === inputValue.toLowerCase()
          );
          if (!foundOption) {
            setInputValue("");
            onChange("");
          }
        }
      }
    }, 150);
  };

  // Seçenek scroll kontrolü
  useEffect(() => {
    if (selectedIndex >= 0 && optionsRef.current) {
      const selectedElement = optionsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className={`relative flex flex-col gap-1 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          ref={inputRef}
          id={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm transition-colors
            ${
              error
                ? "border-red-300 text-red-600 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }
            ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
            focus:outline-none focus:ring-1
            ${inputClassName}
          `}
        />

        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Options Dropdown */}
        {isOpen && (
          <ul
            ref={optionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={`${option.value}-${index}`}
                  className={`
                    px-3 py-2 cursor-pointer transition-colors
                    ${
                      selectedIndex === index
                        ? "bg-blue-100 text-blue-900"
                        : "text-gray-900 hover:bg-gray-100"
                    }
                    ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => !option.disabled && handleOptionSelect(option)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {option.label}
                </li>
              ))
            ) : inputValue.length >= minInputLength ? (
              <li className="px-3 py-2 text-gray-500 cursor-default">
                {noOptionsText}
              </li>
            ) : null}
          </ul>
        )}
      </div>

      {/* Helper Text veya Error */}
      {error ? (
        <span className={`text-sm text-red-600 ${errorClassName}`}>
          {error}
        </span>
      ) : (
        helperText && (
          <span className={`text-sm text-gray-500 ${helperClassName}`}>
            {helperText}
          </span>
        )
      )}
    </div>
  );
};
