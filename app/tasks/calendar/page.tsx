import DashboardLayout from "@/components/layout/DashboardLayout";
import CalendarView from "@/components/tasks/CalendarView";

export default function TaskCalendarPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Task Calendar
        </h1>

        <CalendarView />

      </div>

    </DashboardLayout>
  );
}