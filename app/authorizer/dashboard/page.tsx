import DashboardClient from './DashboardClient';
import { authorizerDashboardTasks } from './dashboard-data';

export default function AuthorizerDashboardPage() {
  return <DashboardClient tasks={authorizerDashboardTasks} />;
}
