import React, { useEffect, useState } from "react";
import TotalCollections from "./TotalCollections";
import BillSettlements from "./BillSettlements";
import AdvanceCollections from "./AdvanceCollections";
import PettyCollections from "./PettyCollections";
import Filters from "./Filters";

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getDates = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  }
  
  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">Dashboard</h6>
      </div>
      <Filters setDates={getDates}/>
      <TotalCollections />
      <BillSettlements />
      <AdvanceCollections />
      <PettyCollections />
    </div>
  );
};

export default Dashboard;
