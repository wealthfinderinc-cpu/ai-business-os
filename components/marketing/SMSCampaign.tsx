"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SMSCampaign() {
  const [message, setMessage] = useState("");

  function sendSMS() {
    toast.success("SMS Campaign Started");
    setMessage("");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        SMS Campaign
      </h2>

      <textarea
        className="h-40 w-full rounded-md border p-3"
        placeholder="SMS Message..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <Button
        className="mt-6 w-full"
        onClick={sendSMS}
      >
        Send SMS
      </Button>

    </div>
  );
}