"use client";

import React from "react";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import Avatar from "./Avatar";

export default function Header({ onMobileToggle }: { onMobileToggle?: () => void }) {
  return (
    <header className="w-full h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 fixed top-0 left-0 z-40">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileToggle}
            className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold">AI</div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">AI Business OS</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">CRM · Insights · Automation</div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="placeholder:text-slate-400 block w-full rounded-md border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-2 pl-10 pr-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search leads, customers, products..."
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            <Avatar />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-sm font-medium">Ramakant</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Admin</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
