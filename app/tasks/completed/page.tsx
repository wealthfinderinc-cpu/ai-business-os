import DashboardLayout from "@/components/layout/DashboardLayout";
import CompletedTasks from "@/components/tasks/CompletedTasks";

export default function CompletedTasksPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Completed Tasks
        </h1>

        <CompletedTasks />

      </div>

    </DashboardLayout>
  );
}