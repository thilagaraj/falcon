import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useProperty from "../../hook/useProperty";

const PropertyDropdown = () => {
  const { properties, currentProperty, switchProperty, isLoading } =
    useProperty();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (properties.length === 1) {
    const singleProperty = properties[0];
    return (
      <div className="d-flex align-items-center gap-2 px-3 py-2 border rounded-3 bg-white text-dark">
        {/* <div className="w-32-px h-32-px radius-8 d-flex justify-content-center align-items-center">
          <span className="w-24-px h-24-px bg-primary flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-50">
            <Icon
              icon="mage:building-a"
              className="text-white text-sm"
            />
          </span>
        </div> */}
        <div className="flex-grow-1 text-start">
          <div className="fw-semibold text-sm text-truncate">
            {singleProperty.HotelName}
          </div>
          <div className="text-xs text-secondary-light text-truncate">
            {singleProperty.HotelLocation}
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything if there are no properties
  if (properties.length === 0) {
    return null;
  }

  const handlePropertySelect = (hotelId) => {
    switchProperty(hotelId);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="d-flex align-items-center gap-2 px-3 py-2 border rounded-3 bg-white text-dark text-decoration-none"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%" }}
      >
        <div className="text-sm text-secondary-light text-truncate">
          <div className="fw-semibold">{currentProperty?.HotelName}</div>
          <div>{currentProperty?.HotelLocation}</div>
        </div>
        <Icon
          icon={isOpen ? "mage:chevron-up" : "mage:chevron-down"}
          className="text-sm"
        />
      </button>

      {isOpen && (
        <div
          className="dropdown-menu show position-absolute"
          style={{
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          {properties.map((property) => (
            <button
              key={property.HotelId}
              className={`dropdown-item d-flex align-items-center  p-0 ${
                currentProperty?.HotelId === property.HotelId ? "" : ""
              }`}
              onClick={() => handlePropertySelect(property.HotelId)}
            >
              <div className=" text-start">
                <div className="fw-semibold text-sm">{property.HotelName}</div>
                <div className="text-xs text-secondary-light">
                  {property.HotelLocation}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyDropdown;
