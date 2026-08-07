"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">
        Something went wrong
      </h2>

      <p className="text-gray-500">
        {error.message}
      </p>

      <Button onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}