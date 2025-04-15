import MasterLayout from "../masterLayout/MasterLayout";
import Dashboard from "../components/dashboard";

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
