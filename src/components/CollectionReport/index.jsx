import { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import { useSpinner } from "../../hook/SpinnerContext";
import $axios from "../../utils/axios";
import { getCurrentDate, formatDateForDb } from "../../utils/date";

const CollectionReport = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [reportData, setReportData] = useState([]);
  const [collectionDetail, setCollectionDetail] = useState(null);
  const [collectionSummary, setCollectionSummary] = useState(null);
  const [reportDate, setReportDate] = useState(getCurrentDate("MM/DD/YYYY"));
  const [toDate, setToDate] = useState(getCurrentDate("MM/DD/YYYY"));

  const getCollectionReportData = async () => {
    try {
      const payload = { fromdt: reportDate, Todt: toDate }; // todate 02/21/2025
      showLoading();
      const response = await $axios.get("Falconreport/DailyCollection", {
        params: payload,
      });
      if (response?.CollectionsModelList) {
        setReportData(response?.CollectionsModelList);
        setCollectionDetail(response?.ColletionDetail || null);
        setCollectionSummary(response?.ColletionSummary || null);
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
    getCollectionReportData();
  }, [reportDate, toDate]);

  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h6 className="fw-semibold mb-0 mob-title">Collection report</h6>
      </div>
      {hideLoading && (
        <ReportTable
          data={reportData}
          onFilter={updateTable}
          collectionDetail={collectionDetail}
          collectionSummary={collectionSummary}
        />
      )}
    </div>
  );
};

export default CollectionReport;
