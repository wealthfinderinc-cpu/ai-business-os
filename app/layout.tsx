import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "AI Business OS",
  description: "Enterprise CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          <Toaster richColors position="top-right" />
        </Provider>
      </body>
    </html>
  );
}