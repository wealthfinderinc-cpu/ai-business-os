"use client";

import { useState } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

type FollowUp = {
  id: number;
  title: string;
  description?: string;
  followUpAt: string;
  completed: boolean;
};

type Props = {
  leadId: number;
};

export default function LeadFollowUps({
  leadId,
}: Props) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [followUpAt, setFollowUpAt] =
    useState("");

  const { data = [] } = useQuery<FollowUp[]>({
    queryKey: ["followups", leadId],

    queryFn: async () => {
      const res = await fetch(
        `/api/leads/${leadId}/followups`
      );

      if (!res.ok) {
        throw new Error(
          "Unable to load followups"
        );
      }

      return res.json();
    },
  });

  async function addFollowUp() {
    if (!title || !followUpAt) {
      toast.error(
        "Title and Date are required"
      );
      return;
    }

    const res = await fetch(
      `/api/leads/${leadId}/followups`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          title,
          description,
          followUpAt,
        }),
      }
    );

    if (!res.ok) {
      toast.error(
        "Unable to save follow-up"
      );
      return;
    }

    toast.success("Follow-up Added");

    setTitle("");
    setDescription("");
    setFollowUpAt("");

    queryClient.invalidateQueries({
      queryKey: ["followups", leadId],
    });
  }  async function toggleComplete(
    id: number,
    completed: boolean
  ) {
    const res = await fetch(
      `/api/leads/${leadId}/followups`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          completed,
        }),
      }
    );

    if (!res.ok) {
      toast.error("Unable to update");
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["followups", leadId],
    });
  }

  async function deleteFollowUp(id: number) {
    if (!confirm("Delete Follow-up?")) return;

    const res = await fetch(
      `/api/leads/${leadId}/followups`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    if (!res.ok) {
      toast.error("Unable to delete");
      return;
    }

    toast.success("Follow-up Deleted");

    queryClient.invalidateQueries({
      queryKey: ["followups", leadId],
    });
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-5">

      <h3 className="mb-5 text-lg font-semibold">
        Follow-up Scheduler
      </h3>

      <div className="space-y-3">

        <Input
          placeholder="Follow-up Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <Input
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <Input
          type="datetime-local"
          value={followUpAt}
          onChange={(e) =>
            setFollowUpAt(e.target.value)
          }
        />

        <Button
          className="w-full"
          onClick={addFollowUp}
        >
          Add Follow-up
        </Button>

      </div>

      <div className="mt-6 space-y-3">

        {data.length === 0 ? (
          <div className="rounded-lg border border-dashed p-5 text-center text-slate-500">
            No Follow-ups
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border bg-slate-50 p-4"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-600">
                    {item.description || "-"}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(
                      item.followUpAt
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="flex gap-2">

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) =>
                      toggleComplete(
                        item.id,
                        e.target.checked
                      )
                    }
                  />

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      deleteFollowUp(item.id)
                    }
                  >
                    Delete
                  </Button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}