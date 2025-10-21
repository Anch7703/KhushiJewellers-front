import React from "react";

const Input = React.forwardRef(({ type = "text", className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
