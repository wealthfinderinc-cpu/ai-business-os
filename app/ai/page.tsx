import DashboardLayout from "@/components/layout/DashboardLayout";
import AIStats from "@/components/ai/AIStats";
import AIChat from "@/components/ai/AIChat";
import PromptLibrary from "@/components/ai/PromptLibrary";

export default function AIPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            AI Business Assistant
          </h1>

          <p className="mt-2 text-slate-500">
            Chat, automation, reports and AI tools.
          </p>

        </div>

        <AIStats />

        <AIChat />

        <PromptLibrary />

      </div>

    </DashboardLayout>
  );
}