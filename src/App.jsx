import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteScrollToTop from "./helper/RouteScrollToTop";
import SignInPage from "./pages/SignInPage";
import PropertySelectionPage from "./pages/PropertySelection";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import SalesReportPage from "./pages/SalesReportPage";
import Spinner from "./components/Common/Spinner";
import { SpinnerProvider, useSpinner } from "./hook/SpinnerContext";
import { AlertProvider } from "./hook/AlertContext";
import PropertyProvider from "./hook/PropertyProvider";
import ProtectedRoute from "./hook/ProtectedRoute";
import GuestInformationForm from "./pages/GuestInformationForm";
import { CheckoutDetails } from "./pages/CheckoutDetails";
import ReportListPage from "./pages/ReportListPage";
import HMSDashboardPage from "./pages/HMSDashboardPage";
import HMSDashboardPage1 from "./pages/HMSDashboardPage1";

import ReviewPage from "./pages/ReviewPage";
import MenuCard from "./pages/MenuCard";
import FlashReportPage from "./pages/FlashReportPage";
import CollectionReportPage from "./pages/CollectionReportPage";
import SalesSegmentPage from "./pages/SalesSegmentPage";
import HouseReportPage from "./pages/HouseReportPage";
import OccupancyReportPage from "./pages/OccupancytPage";
import RestaurantMenuList from "./pages/RestaurantMenuList";
import CarouselPage from "./pages/CarouselPage";

function App() {
  return (
    <SpinnerProvider>
      <AlertProvider>
        <PropertyProvider>
          <BrowserRouter>
          <RouteScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route exact path="/sign-in" element={<SignInPage />} />
            <Route path="/guest-registration" element={<GuestInformationForm />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/report-list" element={<ReportListPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/menu-card" element={<MenuCard />} />
            <Route path="/restaurant-menu" element={<RestaurantMenuList />} />
            <Route path="/carousel" element={<CarouselPage />} />

      
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/property-selection"
                element={<PropertySelectionPage />}
              />
              <Route exact path="/" element={<DashboardPage />} />
              <Route exact path="/dashboard" element={<DashboardPage />} />
              <Route exact path="/hms-dashboard" element={<HMSDashboardPage />} />
              <Route exact path="/hms-dashboard1" element={<HMSDashboardPage1 />} />
              <Route exact path="/sales-report" element={<SalesReportPage />} />
              <Route exact path="/house-report" element={<HouseReportPage />} />
              <Route exact path="/flash-report" element={<FlashReportPage />} />
              <Route exact path="/collection-report" element={<CollectionReportPage />} />
              <Route exact path="/sales-segment" element={<SalesSegmentPage />} />
              <Route exact path="/guest-occupancy" element={<OccupancyReportPage />} />

            </Route>

            {/* Catch-all for 404 */}
            <Route exact path="*" element={<ErrorPage />} />
          </Routes>
          <GlobalSpinner />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          </BrowserRouter>
        </PropertyProvider>
      </AlertProvider>
    </SpinnerProvider>
  );
}

const GlobalSpinner = () => {
  const { loading } = useSpinner();
  return loading ? <Spinner /> : null;
};

export default App;
