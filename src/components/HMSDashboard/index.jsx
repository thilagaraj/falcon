import React, { useEffect, useState } from "react";
import Floors from "./floors";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import RoomStats from "./RoomStats";

const HMSDashboard = () => {
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
        } = response;

        setRoomStatusData({
          Vacant,
          Occupied,
          Unsettled,
          Dirty,
          Blocked,
          ManagementBlocked,
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
    <div className="dashboard-main-body">
      <RoomStats data={roomStatusData} />
      {floorsData.map(
        (floor, index) =>
          !!floor?.rooms?.length && (
            <Floors key={index} data={floor} floorIndex={index} />
          )
      )}
    </div>
  );
};

export default HMSDashboard;
