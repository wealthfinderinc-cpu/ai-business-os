"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, ShoppingCart, FileText, Settings } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  mobileOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
};

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ mobileOpen, onClose, collapsed = false }: Props) {
  const pathname = usePathname() ?? "/";

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col h-screen w-72 dark:bg-slate-900 bg-slate-950 text-slate-100 p-4 md:sticky md:top-16 z-30`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold">AI</div>
          {!collapsed && <div className="font-semibold">AI Business OS</div>}
        </div>
        <div className="hidden md:block text-xs text-slate-400">v1.0</div>
      </div>

      <nav className="flex flex-col gap-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                active
                  ? "bg-gradient-to-r from-indigo-700 to-violet-600 text-white shadow"
                  : "text-slate-300 hover:bg-slate-800/30"
              }`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-slate-400">
        <div className="pt-4">© {new Date().getFullYear()} WealthFinder</div>
      </div>
    </motion.aside>
  );
}
