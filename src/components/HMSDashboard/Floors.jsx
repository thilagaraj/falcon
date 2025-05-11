import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Floors = ({ data, floorIndex }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(floorIndex === 0);

  // Status-to-style mapping
  const statusStyles = {
    O: {
      bg: "bg-danger-50",
      text: "text-danger",
    },
    V: {
      bg: "bg-success-50",
      text: "text-success",
    },
    D: {
      bg: "bg-info-50",
      text: "text-info-800",
    },
    U: {
      bg: "bg-warning-50",
      text: "text-warning-900",
    },
    B: {
      bg: "bg-neutral-50",
      text: "text-neutral",
    },
    M: {
      bg: "bg-cyan-50",
      text: "text-cyan-800",
    },
  };

  const statusMapping = {
    O: "Occupied",
    V: "Vacant",
    M: "Management",
    U: "Unsettled",
    D: "Dirty",
    B: "Blocked",
  };

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <div className="card h-100 p-0 radius-12">
        <div
          className="card-header border-bottom bg-base py-16 px-24 cursor-pointer"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h6 className="text-lg fw-semibold mb-0">
              {toSentenceCase(data.FloorName)}
            </h6>
            <Icon
              icon={isAccordionOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="24"
              height="24"
            />
          </div>
        </div>

        {isAccordionOpen && (
          <div className="card-body p-24">
            <div className="floors-grid">
              {data?.rooms?.map((room, index) => {
                const styles = statusStyles[room.Status] || statusStyles["D"];
                return (
                  <div className="w-150-px"  key={index}>
                    <div className="card border cursor-pointer">
                      <div className="card-body p-0">
                        <div className="text-center p-16">
                          <h6 className={`mb-4 `}>{room.RoomNo}</h6>
                          <div className={`text-xs  mt-0`}>{room.RoomCode}</div>
                        </div>
                        <div
                          className={`w-full h-40-px ${styles.bg} d-flex justify-content-center align-items-center`}
                        >
                          <p
                            className={`text-sm ${styles.text} d-flex align-items-center gap-2 mb-2`}
                          >
                            <Icon
                              icon="material-symbols:hotel"
                              className={`${styles.text} text-xl`}
                            />
                            <span>{statusMapping[room.Status]}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Floors;
