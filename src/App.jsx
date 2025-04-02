import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import SignInPage from "./pages/SignInPage";
import PropertySelectionPage from "./pages/PropertySelection";
import ErrorPage from "./pages/ErrorPage";
import FormValidationPage from "./pages/FormValidationPage";
import Spinner from "./components/common/Spinner";
import Alerts from "./components/common/Alerts";
import { SpinnerProvider, useSpinner } from "./hook/SpinnerContext";
import { AlertProvider } from "./hook/AlertContext";
import ProtectedRoute from "./hook/ProtectedRoute";
import GuestInformationForm from "./pages/GuestInformationForm";

function App() {
  return (
    <SpinnerProvider>
      <AlertProvider>
        <BrowserRouter>
          <RouteScrollToTop />
          <Alerts />
          <Routes>
            {/* Public Routes */}
            <Route exact path="/sign-in" element={<SignInPage />} />
            <Route path="/guest-registration" element={<GuestInformationForm />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/property-selection"
                element={<PropertySelectionPage />}
              />
              <Route exact path="/" element={<SignInPage />} />
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
