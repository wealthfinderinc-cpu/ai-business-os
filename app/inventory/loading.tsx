export default function Loading() {
  return (
    <div className="p-8">

      <div className="mb-6 h-10 w-72 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-4 gap-5">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl bg-slate-200"
          />
        ))}

      </div>

    </div>
  );
}