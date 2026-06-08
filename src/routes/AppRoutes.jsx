import { Navigate, Route, Routes } from "react-router-dom";
import AuthorizerLayout from "../layouts/AuthorizerLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import AssignedFarmers from "../pages/authorizer/AssignedFarmers.jsx";
import Dashboard from "../pages/authorizer/Dashboard.jsx";
import FarmerProfile from "../pages/authorizer/FarmerProfile.jsx";
import FarmNavigation from "../pages/authorizer/FarmNavigation.jsx";
import FinalReport from "../pages/authorizer/FinalReport.jsx";
import Notifications from "../pages/authorizer/Notifications.jsx";
import Verification from "../pages/authorizer/Verification.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/authorizer" element={<AuthorizerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assigned-farmers" element={<AssignedFarmers />} />
        <Route path="farmer-profile/:farmerId" element={<FarmerProfile />} />
        <Route
          path="verification"
          element={<Navigate to="verification/identity" replace />}
        />
        <Route path="verification/:stageId" element={<Verification />} />
        <Route path="final-report" element={<FinalReport />} />
        <Route path="farm-navigation" element={<FarmNavigation />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
