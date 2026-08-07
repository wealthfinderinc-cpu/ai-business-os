# AI Center

This module adds a comprehensive AI Center with multiple AI-powered tools:

- AI Chat
- AI Sales Coach
- AI Report Generator
- AI Proposal Generator
- AI Content Writer
- AI Poster Generator
- Prompt Library
- Automation Builder
- AI Analytics
- AI Business Advisor

Files added:
- types/ai.ts
- lib/ai.ts (server-side OpenAI adapter)
- services/ai.service.ts (client-side service)
- components/ai/* (UI components)
- app/ai/page.tsx, app/ai/layout.tsx
- app/api/ai/* route handlers (chat, sales-coach, report, proposal, content)

Production steps to complete:
- Provide OPENAI_API_KEY in environment to enable server-side AI calls
- Add logging, rate-limiting, and quotas for AI usage
- Add moderation and safety checks for AI-generated content
- Add storage for jobs and results (Prisma models)

Commit: AI Center
