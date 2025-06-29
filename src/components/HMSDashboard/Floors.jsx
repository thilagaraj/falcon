import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Floors = ({ data, floorIndex }) => {

  // Status-to-style mapping
  const statusStyles = {
    O: {
      bg: "bg-custom-color2",
      text: "custom-color2",
    },
    V: {
      bg: "bg-custom-color1",
      text: "custom-color1",
    },
    D: {
      bg: "bg-custom-color3",
      text: "custom-color3",
    },
    U: {
      bg: "bg-custom-color6",
      text: "custom-color6",
    },
    B: {
      bg: "bg-custom-color4",
      text: "custom-color4",
    },
    M: {
      bg: "bg-custom-color5",
      text: "custom-color5",
    },
  };

  const statusMapping = {
    O: "Occupied",
    V: "Vacant",
    M: "Mangmnt",
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
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h6 className="text-lg fw-semibold mb-0 d-flex align-items-center gap-2">
              <span>
                <Icon
                  icon="carbon:hotel"
                  className="text-danger-800 text-xl mb-0"
                ></Icon>
              </span>
              <span> {toSentenceCase(data.FloorName)}</span>
            </h6>
        
          </div>
        </div>

          <div className="card-body p-24">
            <div className="floors-grid">
              {data?.rooms?.map((room, index) => {
                const styles = statusStyles[room.Status] || statusStyles["D"];
                return (
                  <div key={index}>
                    <div className={`card border cursor-pointer ${styles.bg} `}>
                      <div className="card-body p-8">
                        <div className="text-center">
                          <h6 className={`mb-4 text-md `}>{room.RoomNo}</h6>
                          <div className={`text-xxs mt-0 p-6`}>
                            {room.RoomCode}
                          </div>
                        </div>
                        <div
                          className={`w-full  d-flex justify-content-center align-items-center  mt-2 border-top pt-2`}
                        >
                          <p
                            className={`text-xxs ${styles.text} d-flex align-items-center gap-1 mb-0 pt-2`}
                          >
                            <Icon
                              icon="material-symbols:hotel"
                              className={`${styles.text} text-l`}
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
      </div>
    </div>
  );
};

export default Floors;
