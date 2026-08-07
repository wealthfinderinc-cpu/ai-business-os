"use client";

import React from "react";

export function Skeleton({ className = "w-full h-4 rounded-sm" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export default Skeleton;
