"use client";

type Props = {
  invoice?: any;
};

export default function InvoicePreview({
  invoice,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Invoice Preview
      </h2>

      {invoice ? (
        <pre className="overflow-auto rounded-lg bg-slate-100 p-4 text-sm">
          {JSON.stringify(invoice, null, 2)}
        </pre>
      ) : (
        <p className="text-slate-500">
          No Invoice Selected
        </p>
      )}

    </div>
  );
}