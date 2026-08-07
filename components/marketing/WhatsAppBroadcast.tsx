"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function WhatsAppBroadcast() {
  const [message, setMessage] = useState("");

  function sendBroadcast() {
    toast.success("WhatsApp Broadcast Started");
    setMessage("");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        WhatsApp Broadcast
      </h2>

      <textarea
        className="h-40 w-full rounded-md border p-3"
        placeholder="Type your WhatsApp message..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <Button
        className="mt-6 w-full"
        onClick={sendBroadcast}
      >
        Send Broadcast
      </Button>

    </div>
  );
}