import MasterLayout from "../masterLayout/MasterLayout";
import Dashboard from "../components/HMSDashboard";

const DashboardPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        <Dashboard />
      </MasterLayout>
    </>
  );
};

export default DashboardPage;
