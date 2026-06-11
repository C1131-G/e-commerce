import AlertBanner from "@/components/dashboard/alert-banner";
import PendingTasks from "@/components/dashboard/pending-tasks";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentActivity from "@/components/dashboard/recent-activity";
import SummaryCards from "@/components/dashboard/summary-cards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Super Admin Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Monitor platform activity, approvals, orders, revenue, and system
            operations from a single place.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Alert Banner */}
        <AlertBanner />

        {/* Middle Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <PendingTasks />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}
