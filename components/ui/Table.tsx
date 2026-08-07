"use client";

import React from "react";

export function Table({ children, className = "" }: any) {
  return <div className={`overflow-auto rounded-md border border-slate-100 dark:border-slate-700 ${className}`}><table className="min-w-full">{children}</table></div>;
}

export default Table;
