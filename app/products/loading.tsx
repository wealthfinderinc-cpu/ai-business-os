export default function Loading() {
  return (
    <div className="p-10">

      <div className="h-10 w-60 animate-pulse rounded bg-slate-200" />

      <div className="mt-8 grid grid-cols-4 gap-6">

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-slate-200"
          />
        ))}

      </div>

    </div>
  );
}