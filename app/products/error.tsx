"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-red-600">
        Something went wrong
      </h1>

      <p className="mt-3 text-slate-500">
        Unable to load products.
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