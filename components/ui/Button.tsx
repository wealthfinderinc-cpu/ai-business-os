"use client";

import React from "react";

export function Button({ children, className = "", ...props }: any) {
  return (
    <button className={`btn-primary ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
