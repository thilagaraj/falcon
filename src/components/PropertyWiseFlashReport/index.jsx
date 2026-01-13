import { useEffect, useState, useCallback } from "react";
import ReportTable from "./ReportTable";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import { getCurrentDate, formatDateForDb } from "../../utils/date";

const PropertyWiseFlashReport = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [reportData, setReportData] = useState([]);
  const [reportDate, setReportDate] = useState(getCurrentDate("MM/DD/YYYY"));
  const [toDate, setToDate] = useState(getCurrentDate("MM/DD/YYYY"));
  const [filter, setFilter] = useState("Day");


  const getPropertyWiseFlashReportData = useCallback(async () => {
    try {
      
      const payload = { fromdt: reportDate, todate: toDate, filter: filter };
      showLoading();
      const response = await $axios.get("Falconreport/propertywiseFlashReport", {
        params: payload,
      });
      if (response && response.FlashData) {
        setReportData(response.FlashData);
        return true;
      }
      throw response;
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  }, [reportDate, toDate, filter, showLoading, hideLoading]);

  const updateTable = (reportDate, toDate, filter) => {
    setReportDate(formatDateForDb(reportDate, "MM/DD/YYYY"));
    setToDate(formatDateForDb(toDate, "MM/DD/YYYY"));
    if (filter) {
      setFilter(filter);
    }
  };

  useEffect(() => {
    getPropertyWiseFlashReportData();
  }, [reportDate, toDate, filter]);

  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h6 className="fw-semibold mb-0 mob-title">Property Wise Flash Report</h6>
      </div>
      {hideLoading && <ReportTable data={reportData} onFilter={updateTable} filter={filter} />}
    </div>
  );
};

export default PropertyWiseFlashReport;
