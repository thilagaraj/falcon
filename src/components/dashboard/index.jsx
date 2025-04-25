import React, { useEffect, useState } from "react";
import TotalCollections from "./TotalCollections";
import RoomStatus from "./RoomStatus";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useSpinner();
  const [roomStatusData, setRoomStatusData] = useState({});
  const [collectionsData, setCollectionsData] = useState({});

  const getDashboardData = async () => {
    try {
      const payload = {};
      showLoading();
      const response = await $axios.get("FalconHome/dashboard");
      if (response) {
        const {
          Vacant = 0,
          Occupied = 0,
          Un_Settel: Unsettled = 0,
          Dirty = 0,
          Blocked = 0,
          Management: ManagementBlocked = 0,
          Cash = 0,
          Card = 0,
          Online = 0,
          Cheque = 0,
          Refund = 0,
          Wallet = 0,
          CashExpense = 0,
          OtherExpense = 0,
          CashInHand = 0,
          BillsOnHold = 0,
          TotalCollection = 0,
        } = response;
        setRoomStatusData({
          Vacant,
          Occupied,
          Unsettled,
          Dirty,
          Blocked,
          ManagementBlocked,
        });
        setCollectionsData({
          Cash,
          Card,
          Online,
          Cheque,
          Refund,
          Wallet,
          CashExpense,
          OtherExpense,
          CashInHand,
          BillsOnHold,
          TotalCollection,
        });
        return true;
      }

      throw response;
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
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">Dashboard</h6>
      </div>
      <RoomStatus data={roomStatusData} />
      <TotalCollections data={collectionsData} />
    </div>
  );
};

export default Dashboard;
