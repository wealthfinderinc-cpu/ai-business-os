"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-red-600">
        HR Module Error
      </h1>

      <p className="mt-3 text-slate-500">
        Something went wrong while loading the HR module.
      </p>

      <Button
        className="mt-6"
        onClick={reset}
      >
        Try Again
      </Button>

    </div>
  );
}