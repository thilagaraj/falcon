import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ToastContainer } from "react-toastify";

const Facilities = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getFacilities();
  }, []);

  // Client-side search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFacilities(facilities);
    } else {
      const filtered = facilities.filter((facility) =>
        facility.Description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFacilities(filtered);
    }
  }, [searchTerm, facilities]);

  const getFacilities = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetFacilityList?${searchParams.toString()}`
      );
      setFacilities(response?.facilitydetaillist || []);
      setFilteredFacilities(response?.facilitydetaillist || []);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      toast.error("Failed to load facilities. Please try again.");
      setFacilities([]);
      setFilteredFacilities([]);
    } finally {
      hideLoading();
    }
  };

  const getFacilityIcon = (description) => {
    const icons = {
      "Car Parking": "mdi:car",
      Wifi: "mdi:wifi",
      Restaurant: "mdi:silverware-fork-knife",
      "Swimming Pool": "mdi:pool",
      "Laundry Service": "mdi:washing-machine",
      Gym: "mdi:dumbbell",
      Spa: "mdi:spa",
      "Room Service": "mdi:room-service",
    };
    return icons[description] || "mdi:check-circle";
  };

  const getFacilityColor = (index) => {
    const colors = [
      "primary",
      "success",
      "warning",
      "info",
      "danger",
      "secondary",
    ];
    return colors[index % colors.length];
  };

  const renderListView = () => (
    <div className="card m-3">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">Facilities List</h6>
      </div>
      <div className="card-body p-24">
        <ul className="list-group radius-8">
          {filteredFacilities.map((facility, index) => (
            <li
              key={facility.Code}
              className={`list-group-item d-flex align-items-center justify-content-between border text-secondary-light p-16 bg-base ${
                index < filteredFacilities.length - 1 ? "border-bottom-0" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`d-flex justify-content-center align-items-center w-40 h-40 bg-${getFacilityColor(
                    index
                  )}-100 text-${getFacilityColor(index)}-600 radius-8`}
                >
                  <Icon
                    icon={getFacilityIcon(facility.Description)}
                    className="text-lg"
                  />
                </div>
                <div>
                  <h6 className="mb-0 fw-medium">{facility.Description}</h6>
                  {/* <small className="text-neutral-600">
                    Code: {facility.Code}
                  </small> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container-fluid px-4 m-3">
      <ToastContainer />

      {/* Header Section */}
      <div className="row m-3 mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h4 className="text-primary-light mb-2 mt-2">
                Hotel Facilities Management
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="row  m-2 mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-20">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="position-relative">
                    <Icon
                      icon="lucide:search"
                      className="position-absolute top-50 start-0 translate-middle-y ms-3 text-neutral-600"
                    />
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="Search facilities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col-12">
          {filteredFacilities.length === 0 ? (
            <div className="card m-3">
              <div className="card-body text-center py-5">
                <Icon
                  icon="mdi:database-search"
                  className="text-4xl text-neutral-400 mb-3"
                />
                <h5 className="text-neutral-600 mb-2">No facilities found</h5>
                <p className="text-neutral-500 mb-3">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : facilities.length === 0
                    ? "No facilities available. Contact administrator to add facilities."
                    : "Start by adding your first facility"}
                </p>
              </div>
            </div>
          ) : (
            <>{renderListView()}</>
          )}
        </div>
      </div>
    </div>
  );
};
export default Facilities;
