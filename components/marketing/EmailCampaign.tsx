"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EmailCampaign() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function sendEmail() {
    toast.success("Email Campaign Started");

    setSubject("");
    setBody("");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Email Campaign
      </h2>

      <Input
        placeholder="Subject"
        value={subject}
        onChange={(e) =>
          setSubject(e.target.value)
        }
      />

      <textarea
        className="mt-4 h-40 w-full rounded-md border p-3"
        placeholder="Email Body..."
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
      />

      <Button
        className="mt-6 w-full"
        onClick={sendEmail}
      >
        Send Email
      </Button>

    </div>
  );
}