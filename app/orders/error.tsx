"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">

      <h2 className="text-2xl font-bold">
        Orders Error
      </h2>

      <Button onClick={reset}>
        Retry
      </Button>

    </div>
  );
}