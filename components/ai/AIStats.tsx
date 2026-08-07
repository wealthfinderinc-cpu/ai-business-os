"use client";

export default function AIStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-xl border bg-white p-5">
        <h3 className="text-lg font-semibold">
          Total Chats
        </h3>
        <p className="mt-2 text-3xl font-bold">
          0
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h3 className="text-lg font-semibold">
          Reports
        </h3>
        <p className="mt-2 text-3xl font-bold">
          0
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h3 className="text-lg font-semibold">
          Prompts
        </h3>
        <p className="mt-2 text-3xl font-bold">
          0
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h3 className="text-lg font-semibold">
          Automation
        </h3>
        <p className="mt-2 text-3xl font-bold">
          0
        </p>
      </div>

    </div>
  );
}