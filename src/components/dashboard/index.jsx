import { useEffect, useState } from "react";
import TotalCollections from "./TotalCollections";
import RoomStatus from "./RoomStatus";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";

const Dashboard = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [roomStatusData, setRoomStatusData] = useState({});
  const [collectionsData, setCollectionsData] = useState({});
  const [checkin, setCheckin] = useState({});

  const getDashboardData = async () => {
    try {
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
          PaidOut = 0,
          Wallet = 0,
          CashExpense = 0,
          OtherExpences = 0,
          HandCash = 0,
          Outstanding = 0,
          DayTotalCollection = 0,
          ContinueCheckin = 0,
          TodayCheckin = 10,
          TodayCheckout = 20,
          TodayArrival = 10,
          TodayRoomCancel = 10,
          TodayHouseGuest = 30,
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
          PaidOut,
          Wallet,
          CashExpense,
          OtherExpences,
          HandCash,
          Outstanding,
          DayTotalCollection,
        });
        setCheckin({
          ContinueCheckin,
          TodayCheckin,
          TodayCheckout,
          TodayArrival,
          TodayRoomCancel,
          TodayHouseGuest,
        })
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
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h6 className="fw-semibold mb-0 mob-title">Dashboard</h6>
      </div>
      <RoomStatus data={roomStatusData} />
      <TotalCollections data={collectionsData} checkin={checkin} />
    </div>
  );
};

export default Dashboard;
