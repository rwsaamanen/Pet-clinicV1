import { useUser } from "../../contexts/UserContext";
import AdminDashboard from "./AdminDashboard";
import { UserDashboard } from "..";

const DashboardWrapper = () => {
  const { user } = useUser();

  // TODO: Add doctor | user | none

  const DashboardComponent = user?.role === "doctor" ? AdminDashboard : UserDashboard;

  return (
    <>
      <DashboardComponent />
    </>
  );
};

export default DashboardWrapper;
