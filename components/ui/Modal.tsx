"use client";

import React from "react";

export function Modal({ open, children }: { open?: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="bg-white dark:bg-slate-800 rounded-md p-6 z-10 w-full max-w-2xl">{children}</div>
    </div>
  );
}

export default Modal;
