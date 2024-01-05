import React, { ComponentPropsWithoutRef } from "react";
import { InputPropsType } from "src/Types";
/**
 * Input component for user input.
 *
 * @param {InputPropsType} props - The props for the Input component.
 * @param {string} props.type - The type of input element (e.g., "text", "number").
 * @param {function} [props.onChangeHandler] - A function to handle input changes (optional).
 * @param {string} [props.className] - Additional CSS class for styling (optional).
 * @param {string} props.labelFor - The "for" attribute of the label (must match the input's "id").
 * @param {string} props.labelText - The text content of the label.
 * @param {boolean} [props.isRequired] - Indicates if the input is required (true or false, optional).
 * @returns {JSX.Element} The Input component.
 */
const Input = ({
  type,
  value,
  onChangeHandler,
  className,
  labelFor,
  labelText,
  isRequired,
}: ComponentPropsWithoutRef<"input"> & InputPropsType) => {
  return (
    <>
      {/* Input label */}
      <label htmlFor={labelFor}>{labelText}</label>

      {/* Input element with specified attributes */}
      <input
        value={value}
        required={isRequired}
        name={labelFor}
        className={className ?? ""}
        type={type}
        onChange={onChangeHandler}
      />
    </>
  );
};

// Memoize the Input component to optimize rendering
export default React.memo(Input);
