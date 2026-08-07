import LeadForm from "@/components/leads/LeadForm";
import LeadTable from "@/components/leads/LeadTable";

export default function LeadsPage() {
  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Lead Management
      </h1>

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <LeadForm />

        <LeadTable />
      </div>
    </main>
  );
}