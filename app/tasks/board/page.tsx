import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskBoard from "@/components/tasks/TaskBoard";

export default function TaskBoardPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Kanban Board
        </h1>

        <TaskBoard />

      </div>

    </DashboardLayout>
  );
}