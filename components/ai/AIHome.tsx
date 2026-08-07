"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AIChat from '@/components/ai/AIChat';
import AISalesCoach from '@/components/ai/AISalesCoach';
import AIReportGenerator from '@/components/ai/AIReportGenerator';
import AIProposalGenerator from '@/components/ai/AIProposalGenerator';
import AIContentWriter from '@/components/ai/AIContentWriter';
import AIPosterGenerator from '@/components/ai/AIPosterGenerator';
import AIPromptLibrary from '@/components/ai/AIPromptLibrary';
import AIAutomationBuilder from '@/components/ai/AIAutomationBuilder';
import AIAnalytics from '@/components/ai/AIAnalytics';
import AIBusinessAdvisor from '@/components/ai/AIBusinessAdvisor';

export default function AIHome() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">AI Center</h1>
            <p className="text-sm text-slate-500">AI-powered tools to accelerate sales, marketing and operations.</p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <AIChat />
            <AISalesCoach />
            <AIReportGenerator />
            <AIProposalGenerator />
            <AIContentWriter />
          </div>

          <aside className="space-y-4">
            <AIPosterGenerator />
            <AIPromptLibrary />
            <AIAutomationBuilder />
            <AIAnalytics />
            <AIBusinessAdvisor />
          </aside>
        </section>
      </div>
    </DashboardLayout>
  );
}
