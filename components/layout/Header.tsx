"use client";

import React from "react";
import { Menu } from "lucide-react";

export default function Header({ onMobileToggle }: { onMobileToggle?: () => void }) {
  return (
    <header className="w-full h-16 bg-white border-b fixed top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMobileToggle} className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">AI</div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold">AI Business OS</div>
              <div className="text-xs text-slate-500">Premium CRM</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-600">Welcome, Ramakant 👋</div>
      </div>
    </header>
  );
}
