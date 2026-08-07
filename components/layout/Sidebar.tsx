"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserRound,
  Package,
  ShoppingCart,
  FileText,
  Settings,
} from "lucide-react";

type Props = {
  mobileOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
};

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Customers", href: "/customers", icon: UserRound },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ mobileOpen, onClose, collapsed = false }: Props) {
  const pathname = usePathname() ?? "/";

  const containerClass =
    "flex flex-col h-full bg-slate-900 text-white p-4 md:sticky md:top-16";

  return (
    <aside
      className={`${containerClass} ${collapsed ? "w-20" : "w-64"} ${mobileOpen ? "block" : "hidden"} md:block`}
    >
      <div className="mb-6 flex items-center justify-center md:justify-start">
        <div className="flex items-center gap-3 w-full">
          <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center font-bold">AI</div>
          {!collapsed && <div className="hidden md:block font-semibold">AI Business OS</div>}
          {onClose && (
            <button className="ml-auto md:hidden text-white" onClick={onClose} aria-label="Close sidebar">✕</button>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                active ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-slate-400">
        {!collapsed && <div className="pt-4">v1.0 · Premium</div>}
      </div>
    </aside>
  );
}
