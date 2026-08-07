export default function Loading() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
        <p className="text-slate-600">
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}