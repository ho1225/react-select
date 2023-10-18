import { useEffect, useState } from "react";
import styles from "../css/select.module.css";

export type SelectOptions = {
  label: string;
  value: string | number;
};

export type SelectProps = {
  options: SelectOptions[];
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<string | number>(0);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  function clearOption() {
    onChange(undefined);
  }

  function selectOption(option: SelectOptions) {
    if (option !== value) onChange(option);
  }

  function isOptionSelected(option: SelectOptions) {
    return option === value;
  }

  return (
    <>
      <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>{value?.label}</span>
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
