import { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import { getCurrentDate, formatDateForDb } from "../../utils/date";

const PettyCashReport = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [reportData, setReportData] = useState([]);
  const [reportDate, setReportDate] = useState(getCurrentDate("MM/DD/YYYY"));
  const [toDate, setToDate] = useState(getCurrentDate("MM/DD/YYYY"));


  const getPettyCashReportData = async () => {
    try {
      
      const payload = { fromdt: reportDate, ToDt: toDate };
      showLoading();
      const response = await $axios.get("Falconreport/PettyCashReport", {
        params: payload,
      });
      if (response && response.PettyCashList) {
        setReportData([
          ...response.PettyCashList,
          // response.PettyCashSummary,
        ]);
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
    setToDate(formatDateForDb(toDate, "MM/DD/YYYY"))
  };

  useEffect(() => {
    getPettyCashReportData();
  }, [reportDate, toDate]);

  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h6 className="fw-semibold mb-0 mob-title">Property Wise Flash Report</h6>
      </div>
      {hideLoading && <ReportTable data={reportData} onFilter={updateTable} />}
    </div>
  );
};

export default PettyCashReport;
