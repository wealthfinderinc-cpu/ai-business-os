"use client";

import { useState } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

type Note = {
  id: number;
  note: string;
  createdAt: string;
};

type Props = {
  leadId: number;
};

export default function LeadNotes({
  leadId,
}: Props) {
  const queryClient = useQueryClient();

  const [note, setNote] = useState("");

  const { data = [] } = useQuery<Note[]>({
    queryKey: ["lead-notes", leadId],

    queryFn: async () => {
      const res = await fetch(
        `/api/leads/${leadId}/notes`
      );

      if (!res.ok) {
        throw new Error("Unable to fetch notes");
      }

      return res.json();
    },
  });

  async function addNote() {
    if (!note.trim()) return;

    const res = await fetch(
      `/api/leads/${leadId}/notes`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          note,
        }),
      }
    );

    if (!res.ok) {
      toast.error("Unable to save note");
      return;
    }

    toast.success("Note Added");

    setNote("");

    queryClient.invalidateQueries({
      queryKey: ["lead-notes", leadId],
    });
  }  return (
    <div className="mt-6 rounded-xl border bg-white p-5">

      <h3 className="mb-4 text-lg font-semibold">
        Notes Timeline
      </h3>

      <div className="mb-5 flex gap-3">

        <Input
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button onClick={addNote}>
          Add Note
        </Button>

      </div>

      <div className="space-y-4">

        {data.length === 0 ? (
          <div className="rounded-lg border border-dashed p-5 text-center text-slate-500">
            No Notes Added
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border-l-4 border-blue-500 bg-slate-50 p-4"
            >

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </span>

              </div>

              <p className="text-sm leading-6">
                {item.note}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}