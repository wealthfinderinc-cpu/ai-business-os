"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/dashboard" className="text-slate-400 hover:text-slate-600">
            Home
          </Link>
        </li>
        {parts.map((part, idx) => {
          const href = "/" + parts.slice(0, idx + 1).join("/");
          const name = part.replace(/[-_]/g, " ");
          const last = idx === parts.length - 1;
          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-slate-300">/</span>
              {last ? (
                <span className="capitalize text-slate-700">{name}</span>
              ) : (
                <Link href={href} className="capitalize text-slate-500 hover:text-slate-700">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
