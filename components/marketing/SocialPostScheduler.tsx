"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SocialPostScheduler() {
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");

  function schedulePost() {
    toast.success("Post Scheduled");

    setCaption("");
    setDate("");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Social Post Scheduler
      </h2>

      <textarea
        className="h-32 w-full rounded-md border p-3"
        placeholder="Caption..."
        value={caption}
        onChange={(e) =>
          setCaption(e.target.value)
        }
      />

      <Input
        className="mt-4"
        type="datetime-local"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      <Button
        className="mt-6 w-full"
        onClick={schedulePost}
      >
        Schedule Post
      </Button>

    </div>
  );
}