import { useAlert } from "../../hook/AlertContext";

const GlobalAlert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert.show) return null;

  const alertStyles = {
    success: "alert-success bg-success-100 text-success-600 border-success-100",
    info: "alert-info bg-info-100 text-info-600 border-info-100",
    warning: "alert-warning bg-warning-100 text-warning-600 border-warning-100",
    error: "alert-danger bg-danger-100 text-danger-600 border-danger-100",
  };

  return (
    <div className={`alert ${alertStyles[alert.type]} px-24 py-11 mb-0 fw-semibold text-lg radius-8`} role="alert">
      <div className="d-flex align-items-center justify-content-between text-lg">
        {alert.title && <span>{alert.title}</span>}
        <button className="remove-button text-xxl line-height-1" onClick={hideAlert}>
          <iconify-icon icon="iconamoon:sign-times-light" className="icon"></iconify-icon>
        </button>
      </div>
      <p className="fw-medium text-sm mt-8">{alert.message}</p>
    </div>
  );
};

export default GlobalAlert;
