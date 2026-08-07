"use client";

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
        Finance Module Error
      </h2>

      <p>{error.message}</p>

      <button
        onClick={reset}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}