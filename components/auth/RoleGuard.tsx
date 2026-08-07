"use client";

import { useSession } from "next-auth/react";

type Props = {
  roles: string[];
  children: React.ReactNode;
};

export default function RoleGuard({
  roles,
  children,
}: Props) {
  const { data: session } = useSession();

  const role = (session?.user as any)?.role;

  if (!role) return null;

  if (!roles.includes(role)) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Access Denied
        </h2>

        <p className="mt-2 text-slate-600">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}