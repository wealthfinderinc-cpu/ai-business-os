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

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/leads",
    icon: Users,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: UserRound,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 250,
        background: "#111827",
        color: "#fff",
        minHeight: "100vh",
        padding: 20,
        position: "sticky",
        top: 0,
      }}
    >
      <h2
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        AI Business OS
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 10,
                textDecoration: "none",
                color: "#fff",
                background: active
                  ? "#2563eb"
                  : "#1f2937",
                transition: "0.2s",
                fontWeight: active ? "bold" : 500,
              }}
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}