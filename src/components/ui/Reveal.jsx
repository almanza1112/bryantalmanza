import React from "react";
import useReveal from "../../hooks/useReveal";

/**
 * @param {string} variant "up" (default) | "left" | "fade"
 * @param {number} delay   stagger in ms
 */
const Reveal = ({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) => {
  const ref = useReveal(delay);

  return (
    <Tag ref={ref} data-reveal={variant} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
