import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import SignInPage from "./pages/SignInPage";
import PropertySelectionPage from "./pages/PropertySelection";
import ErrorPage from "./pages/ErrorPage";
import FormValidationPage from "./pages/FormValidationPage";
import DashboardPage from "./pages/DashboardPage";
import Spinner from "./components/common/Spinner";
import Alerts from "./components/common/Alerts";
import { SpinnerProvider, useSpinner } from "./hook/SpinnerContext";
import { AlertProvider } from "./hook/AlertContext";
import ProtectedRoute from "./hook/ProtectedRoute";
import GuestInformationForm from "./pages/GuestInformationForm";
import { CheckoutDetails } from "./pages/CheckoutDetails";
import ReportListPage from "./pages/ReportListPage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <SpinnerProvider>
      <AlertProvider>
        <BrowserRouter>
          <RouteScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route exact path="/sign-in" element={<SignInPage />} />
            <Route path="/guest-registration" element={<GuestInformationForm />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/report-list" element={<ReportListPage />} />
            <Route path="/review" element={<ReviewPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/property-selection"
                element={<PropertySelectionPage />}
              />
              <Route exact path="/" element={<DashboardPage />} />
              <Route
                exact
                path="/form-validation"
                element={<FormValidationPage />}
              />
            </Route>

            {/* Catch-all for 404 */}
            <Route exact path="*" element={<ErrorPage />} />
          </Routes>
          <GlobalSpinner />
        </BrowserRouter>
      </AlertProvider>
    </SpinnerProvider>
  );
}

const GlobalSpinner = () => {
  const { loading } = useSpinner();
  return loading ? <Spinner /> : null;
};

export default App;
