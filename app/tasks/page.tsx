import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskStats from "@/components/tasks/TaskStats";
import TaskForm from "@/components/tasks/TaskForm";
import TaskTable from "@/components/tasks/TaskTable";

export default function TasksPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Task Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage daily tasks, follow-ups and reminders.
          </p>

        </div>

        <TaskStats />

        <TaskForm />

        <TaskTable />

      </div>

    </DashboardLayout>
  );
}