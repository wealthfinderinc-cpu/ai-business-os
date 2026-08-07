"use client";

import { useRef, useState } from "react";

import {
  Bot,
  User,
  Send,
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistant() {

  const [loading, setLoading] =
    useState(false);

  const [prompt, setPrompt] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        content:
          "👋 Welcome to AI Business OS.\n\nHow can I help you today?",
      },
    ]);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  async function sendMessage() {

    if (!prompt.trim())
      return;

    const question = prompt;

    setPrompt("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    try {

      setLoading(true);

      const res = await fetch(
        "/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt: question,
          }),
        }
      );

      const data =
        await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.response ??
            "No response",
        },
      ]);

      setTimeout(() => {

        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });

      }, 100);

    } catch {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  }

  function clearChat() {

    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared successfully.",
      },
    ]);

  }

  return (

    <div className="flex h-[calc(100vh-120px)] flex-col rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-indigo-100 p-3">

            <Sparkles className="h-6 w-6 text-indigo-600" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              AI Assistant

            </h2>

            <p className="text-sm text-slate-500">

              GPT Powered Business Assistant

            </p>

          </div>

        </div>

        <Button
          variant="outline"
          onClick={clearChat}
        >

          <Trash2 className="mr-2 h-4 w-4" />

          Clear

        </Button>

      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-6">

        {messages.map(
          (message, index) => (

            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`flex max-w-3xl gap-3 rounded-xl p-4 ${
                  message.role === "assistant"
                    ? "bg-slate-100"
                    : "bg-indigo-600 text-white"
                }`}
              >

                <div>

                  {message.role ===
                  "assistant" ? (

                    <Bot className="mt-1 h-5 w-5" />

                  ) : (

                    <User className="mt-1 h-5 w-5" />

                  )}

                </div>

                <div className="whitespace-pre-wrap">

                  {message.content}

                </div>

              </div>

            </div>

          )
        )}

        <div ref={bottomRef} />

      </div>      <div className="border-t bg-white p-5">

        <div className="flex gap-3">

          <Input
            placeholder="Ask anything about your business..."
            value={prompt}
            disabled={loading}
            onChange={(e) =>
              setPrompt(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                sendMessage();

              }

            }}
          />

          <Button
            disabled={
              loading ||
              !prompt.trim()
            }
            onClick={sendMessage}
          >

            {loading ? (

              <Loader2 className="h-5 w-5 animate-spin" />

            ) : (

              <Send className="h-5 w-5" />

            )}

          </Button>

        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPrompt(
                "Show today's sales summary."
              )
            }
          >
            Sales Summary
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPrompt(
                "Show low stock products."
              )
            }
          >
            Low Stock
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPrompt(
                "Generate follow-up messages for new leads."
              )
            }
          >
            Lead Follow-up
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPrompt(
                "Create today's business report."
              )
            }
          >
            Daily Report
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPrompt(
                "Analyze business performance."
              )
            }
          >
            AI Analysis
          </Button>

        </div>

        <div className="mt-5 border-t pt-4 text-center text-xs text-slate-500">

          Powered by OpenAI GPT • AI Business OS Enterprise

        </div>

      </div>

    </div>

  );

}