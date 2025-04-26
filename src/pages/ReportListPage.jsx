import { Icon } from "@iconify/react";
import "./ReportListPage.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";

const dashboardList = [
  {
    icon: "mdi:file-document",
    label: "Bill Detail",
    bg: "card-teal",
    value: "BillDetail",
  },
  {
    icon: "mdi:cash",
    label: "Pay Advance",
    bg: "card-blue",
    value: "PayAdvance",
  },
  {
    icon: "mdi:food",
    label: "View Menu",
    bg: "card-purple",
    value: "ViewMenu",
  },
  {
    icon: "mdi:bed",
    label: "Extrabed Request",
    bg: "card-orange",
    value: "ExtrabedRequest",
  },
  {
    icon: "mdi:comment",
    label: "Feedback",
    bg: "card-teal",
    value: "Feedback",
  },
  {
    icon: "mdi:room-service-outline",
    label: "Facilities",
    bg: "card-blue",
    value: "Facilities",
  },
  {
    icon: "mdi:magnify",
    label: "Enquiry Detail",
    bg: "card-purple",
    value: "EnquiryDetail",
  },
  {
    icon: "mdi:calendar-check",
    label: "Reservation",
    bg: "card-orange",
    value: "Reservation",
  },
];
const ReportListPage = () => {
  const [dashboard, setDashboard] = useState({});
  const [searchParams] = useSearchParams();
  const branchCode = searchParams.get("BranchCode");
  const hotelId = searchParams.get("HotelId");
  const propertyId = searchParams.get("PropertyId");
  const checkinNo = searchParams.get("CheckinNo");
  const mobileNo = searchParams.get("MobileNo");
  const { showLoading, hideLoading } = useSpinner();
  const [guestInfoDashboard, setGuestInfoDashboard] = useState([]);

  useEffect(() => {
    getGuestDashboard();
  }, []);

  const getGuestDashboard = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetGuestDashboard?BranchCode=${branchCode}&PropertyId=${propertyId}&HotelId=${hotelId}&CheckinNo=${checkinNo}&MobileNo=${mobileNo}`
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
    console.log('Card clicked:', item);
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
                  className={`h-120-px shadow d-flex flex-column justify-content-between py-24 px-20 rounded-4 ${item.bg} ${item.enabled ? 'cursor-pointer' : 'disabled'}`}
                  onClick={item.enabled ? () => handleCardClick(item) : undefined}
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
