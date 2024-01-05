import React from "react";
import { ComponentPropsWithoutRef } from "react";
import { ButtonProps } from "src/Types";

/**
 * Button component that displays a button with a title and click handler.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {string} props.title - The text to display on the button.
 * @param {() => void} [props.onClickHandler] - A function to handle button clicks (optional).
 * @returns {JSX.Element} The Button component.
 */
const Button = ({
  title,
  onClickHandler,
}: ComponentPropsWithoutRef<"button"> & ButtonProps) => {
  return (
    <div>
      <button style={{ margin: "5px" }} onClick={onClickHandler}>
        {title}
      </button>
    </div>
  );
};

// Memoize the Button component to optimize rendering
export default React.memo(Button);
