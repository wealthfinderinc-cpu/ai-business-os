"use client";

import React from "react";

export function Card({ children, className = "" }: any) {
  return <div className={`card ${className}`}>{children}</div>;
}

export default Card;
