import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";

const dashboardList = [
  {
    icon: "mdi:file-document",
    label: "Bill Detail",
    bg: "linear-gradient(135deg, #20c997, #0ca678)",
    value: "BillDetail",
  },
  {
    icon: "mdi:cash",
    label: "Pay Advance",
    bg: "linear-gradient(135deg, #339af0, #1971c2)",
    value: "PayAdvance",
  },
  {
    icon: "mdi:food",
    label: "View Menu",
    bg: "linear-gradient(135deg, #9775fa, #7048e8)",
    value: "ViewMenu",
  },
  {
    icon: "mdi:bed",
    label: "Extrabed Request",
    bg: "linear-gradient(135deg, #ff922b, #f76707)",
    value: "ExtrabedRequest",
  },
  {
    icon: "mdi:comment",
    label: "Feedback",
    bg: "linear-gradient(135deg, #20c997, #0ca678)",
    value: "Feedback",
  },
  {
    icon: "mdi:room-service-outline",
    label: "Facilities",
    bg: "linear-gradient(135deg, #339af0, #1971c2)",
    value: "Facilities",
  },
  {
    icon: "mdi:magnify",
    label: "Enquiry Detail",
    bg: "linear-gradient(135deg, #9775fa, #7048e8)",
    value: "EnquiryDetail",
  },
  {
    icon: "mdi:calendar-check",
    label: "Reservation",
    bg: "linear-gradient(135deg, #ff922b, #f76707)",
    value: "Reservation",
  },
];
const ReportListPage = () => {
  const [dashboard, setDashboard] = useState({});
  const [searchParams] = useSearchParams();
  const { showLoading, hideLoading } = useSpinner();
  const [guestInfoDashboard, setGuestInfoDashboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGuestDashboard();
  }, []);

  const getGuestDashboard = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetGuestDashboard?${searchParams.toString()}`
      );
      console.log(response);
      setDashboard(response);
      const arr = Object.entries(response?.GuestInfoDashboard).map(
        ([key, enabled]) => ({ key, enabled })
      );
      const updatedArr = arr.map((item) => {
        const dashboardItem = dashboardList.find(
          (dashboardItem) => dashboardItem.value === item.key
        );
        item = { ...item, ...dashboardItem };
        return item;
      });
      setGuestInfoDashboard(updatedArr);
    } catch (error) {
      console.error("Error fetching checkout details:", error);
    } finally {
      hideLoading();
    }
  };

  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
    switch (item.value) {
      case "BillDetail":
        navigate(`/checkout-details?${searchParams.toString()}`);
        break;
      case "Feedback":
        navigate(`/review?${searchParams.toString()}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vw-100 min-vh-100">
      <div className="container px-4 d-flex flex-column">
        <header className="py-24 rounded-3 shadow-lg w-100 mt-5 mt-md-2">
          <h1 className="fs-4 text-center text-white mb-0 mt-2 px-3 text-black">
            {dashboard?.HeaderTittle}
          </h1>
        </header>
        <div className="mt-3 mx-1">
          <div className="row d-flex justify-content-center align-items-center">
            {guestInfoDashboard.map((item, index) => (
              <div className="col-6 col-md-4 col-lg-3 mb-3" key={index}>
                <div
                  style={{ background: item.bg }}
                  className={`h-120-px shadow d-flex flex-column justify-content-between py-24 px-20 rounded-4  ${
                    item.enabled ? "cursor-pointer" : "disabled"
                  }`}
                  onClick={
                    item.enabled ? () => handleCardClick(item) : undefined
                  }
                >
                  <div className="card-icon">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <Icon
                        icon={item.icon}
                        width="24"
                        style={{ color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="card-title fw-bold text-white">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportListPage;
