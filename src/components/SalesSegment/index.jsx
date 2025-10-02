import React, { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import { getCurrentDate, formatDateForDb } from "../../utils/date";

const SalesSegment = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [reportData, setReportData] = useState([]);
  const [reportDate, setReportDate] = useState(getCurrentDate("MM/DD/YYYY"));
  const [toDate, setToDate] = useState(getCurrentDate("MM/DD/YYYY"));

  const getSalesSegmentData = async () => {
    try {
      const payload = { fromdt: reportDate, Todt: toDate }; // todate 02/21/2025
      showLoading();
      const response = await $axios.get("Falconreport/HotelSaleReport", {
        params: payload,
      });
      if (response?.HotelSegmentList) {
        setReportData(response?.HotelSegmentList);
        return true;
      }
      throw response;
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  const updateTable = (fromDate, toDate) => {
    setReportDate(formatDateForDb(fromDate, "MM/DD/YYYY"));
    setToDate(formatDateForDb(toDate, "MM/DD/YYYY"));
  };

  useEffect(() => {
    getSalesSegmentData();
  }, [reportDate, toDate]);

  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h6 className="fw-semibold mb-2 mob-title">Sales Segment</h6>
      </div>
      {hideLoading && <ReportTable data={reportData} onFilter={updateTable} />}
    </div>
  );
};

export default SalesSegment;
