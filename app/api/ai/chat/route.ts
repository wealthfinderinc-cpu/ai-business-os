import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

import { openai } from "@/lib/openai";

import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

import {
  executeTool,
  aiToolDefinitions,
} from "@/lib/ai/tools";

const MODEL = "gpt-5.5";

export async function POST(
  req: NextRequest
) {
  try {

    const body = await req.json();

    const prompt =
      body.prompt?.trim() ?? "";

    if (!prompt) {

      return NextResponse.json(
        {
          success: false,
          response: "Prompt is required.",
        },
        {
          status: 400,
        }
      );

    }

    const response =
      await openai.chat.completions.create({

        model: MODEL,

        temperature: 0.4,

        messages: [

          {
            role: "system",
            content: SYSTEM_PROMPT,
          },

          {
            role: "user",
            content: prompt,
          },

        ],

        tools: aiToolDefinitions.map(
          (tool) => ({

            type: "function",

            function: {

              name: tool.name,

              description:
                tool.description,

              parameters: {
                type: "object",
                properties: {
                  keyword: {
                    type: "string",
                  },
                },
              },

            },

          })
        ),

        tool_choice: "auto",

      });

    const message =
      response.choices[0].message;

    if (!message.tool_calls) {

      return NextResponse.json({

        success: true,

        response:
          message.content,

      });

    }

    const results = [];

    for (const call of message.tool_calls) {

      const fn =
        call.function.name;

      const args =
        JSON.parse(
          call.function.arguments ||
            "{}"
        );

      const output =
        await executeTool(
          fn as any,
          args
        );

      results.push({

        tool: fn,

        data: output,

      });

    }    const finalResponse =
      await openai.chat.completions.create({

        model: MODEL,

        temperature: 0.4,

        messages: [

          {
            role: "system",
            content: SYSTEM_PROMPT,
          },

          {
            role: "user",
            content: prompt,
          },

          {
            role: "assistant",
            tool_calls: message.tool_calls,
          } as OpenAI.Chat.ChatCompletionAssistantMessageParam,

          ...message.tool_calls.map(
            (call, index) => ({

              role: "tool" as const,

              tool_call_id: call.id,

              content: JSON.stringify(
                results[index].data
              ),

            })
          ),

        ],

      });

    return NextResponse.json({

      success: true,

      response:
        finalResponse.choices[0]
          .message.content,

      toolResults: results,

    });

  } catch (error) {

    console.error(
      "AI Route Error:",
      error
    );

    return NextResponse.json(

      {

        success: false,

        response:
          "Internal AI Server Error.",

      },

      {

        status: 500,

      }

    );

  }

}