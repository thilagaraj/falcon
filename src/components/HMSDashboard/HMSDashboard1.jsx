import React, { useEffect, useState } from "react";
import Floors from "./Floors1";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import RoomStats from "./RoomStats1";

const HMSDashboard1 = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useSpinner();
  const [floorsData, setFloorsData] = useState([]);
  const [roomStatusData, setRoomStatusData] = useState({});

  const getDashboardData = async () => {
    try {
      const payload = {};
      showLoading();
      const response = await $axios.get("FalconHome/HMSdashboard");

      if (response && response.Floors?.length && response.Rooms?.length) {
        const updatedFloors = response.Floors.map((floor, findex) => {
          const rooms = response.Rooms.filter(
            (room) => room.FloorCode === floor.FloorCode
          );

          floor.rooms = rooms;
          return floor;
        });

        setFloorsData(updatedFloors);

        const {
          Vacant = 0,
          Occupied = 0,
          Un_Settel: Unsettled = 0,
          Dirty = 0,
          Blocked = 0,
          Management: ManagementBlocked = 0,
          Occ = 0,
          TodayCheckin = 0,
          TodayCheckout = 0,
        } = response;

        setRoomStatusData({
          Vacant,
          Occupied,
          Unsettled,
          Dirty,
          Blocked,
          ManagementBlocked,
          Occ,
          TodayCheckin,
          TodayCheckout,
        });

        return response;
      }

      throw new Error("No data found");
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="dashboard-main-body bg-white ">
      <div className="ps-10 pe-6">
      <RoomStats data={roomStatusData} />
      <hr className="mt-2" />

      <div>
      {floorsData.map(
        (floor, index) =>
          !!floor?.rooms?.length && (
            <Floors key={index} data={floor} floorIndex={index} />
          )
      )}
      </div>
      </div>
    </div>
  );
};

export default HMSDashboard1;
