import React, { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import { getCurrentDate, formatDateForDb } from "../../utils/date";

const OccupancyReport = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [reportData, setReportData] = useState([]);
  const [reportDate, setReportDate] = useState(getCurrentDate("MM/DD/YYYY"));

  const getOccupancyReportData = async () => {
    try {
      const payload = { fromdt: reportDate };
      showLoading();
      const response = await $axios.get("Falconreport/GuestOccupanyReport", {
        params: payload,
      });
      if (response?.GuestOccupancyList) {
        setReportData(response?.GuestOccupancyList);
        return true;
      }
      throw response;
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  const updateTable = (reportDate) => {
    setReportDate(formatDateForDb(reportDate, "MM/DD/YYYY"));
  };

  useEffect(() => {
    getOccupancyReportData();
  }, [reportDate]);

  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h6 className="fw-semibold mb-0 mob-title">Guest Occupany List</h6>
      </div>
      {hideLoading && <ReportTable data={reportData} onFilter={updateTable} />}
    </div>
  );
};

export default OccupancyReport;
