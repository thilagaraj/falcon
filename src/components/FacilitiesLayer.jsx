import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const FacilitiesLayer = ({ show, handleClose, branchCode, propertyId, hotelId }) => {
  const { showLoading, hideLoading } = useSpinner();
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (show) {
      getFacilities();
    }
  }, [show]);

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
        `/FalconQRScan/GetFacilityList?BranchCode=${branchCode}&PropertyId=${propertyId}&HotelId=${hotelId}`
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

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Hotel Facilities</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
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

        {filteredFacilities.length === 0 ? (
          <div className="text-center py-4">
            <Icon
              icon="mdi:database-search"
              className="text-4xl text-neutral-400 mb-3"
              width="48"
            />
            <h5 className="text-neutral-600 mb-2">No facilities found</h5>
            <p className="text-neutral-500 mb-3">
              {searchTerm
                ? "Try adjusting your search terms"
                : facilities.length === 0
                ? "No facilities available"
                : "Start by adding your first facility"}
            </p>
          </div>
        ) : (
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FacilitiesLayer;
