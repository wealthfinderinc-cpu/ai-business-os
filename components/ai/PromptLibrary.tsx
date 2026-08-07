"use client";

export default function PromptLibrary() {
  const prompts = [
    "Sales Script",
    "Follow Up",
    "Customer Reply",
    "WhatsApp Broadcast",
    "Email Marketing",
  ];

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-bold">
        Prompt Library
      </h2>

      <div className="space-y-3">
        {prompts.map((prompt) => (
          <div
            key={prompt}
            className="rounded-lg border p-4"
          >
            {prompt}
          </div>
        ))}
      </div>
    </div>
  );
}