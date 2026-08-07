"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");

  function sendPrompt() {
    setPrompt("");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        AI Chat
      </h2>

      <textarea
        className="h-40 w-full rounded-md border p-3"
        placeholder="Ask AI anything..."
        value={prompt}
        onChange={(e)=>
          setPrompt(e.target.value)
        }
      />

      <Button
        className="mt-6 w-full"
        onClick={sendPrompt}
      >
        Send
      </Button>

    </div>
  );
}