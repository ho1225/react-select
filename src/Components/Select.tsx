import { useEffect, useRef, useState } from "react";
import styles from "../css/select.module.css";

export type SelectOptions = {
  label: string;
  value: string | number;
};

export type MultipleSelectProps = {
  mutiple: true;
  value?: SelectOptions[];
  onChange: (value: SelectOptions[]) => void;
};

export type SingleSelectProps = {
  mutiple?: false;
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

export type SelectProps = {
  options: SelectOptions[];
} & (SingleSelectProps | MultipleSelectProps);

function Select({ mutiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  function clearOption() {
    mutiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOptions) {
    if (mutiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...(value ?? []), option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOptions) {
    return mutiple ? value?.includes(option) : option === value;
  }

  return (
    <>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {mutiple
            ? value?.map((v) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  key={v.label}
                  className={styles["option-badge"]}
                >
                  {v.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOption();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              }
              ${highlightedIndex === index ? styles.highlighted : ""}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Select;
