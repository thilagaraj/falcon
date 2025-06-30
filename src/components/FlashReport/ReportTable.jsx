import React from "react";
import Filter from "./Filter";

const ReportTable = ({ data, onFilter }) => {
  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} />
      </div>
      <div className="card-body" style={{ maxHeight: 400, overflowY: 'auto' }}>
        <table className="table table-bordered mb-0 flash-report-table" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              <th>OutLet</th>
              <th>DAY</th>
              <th>MONTH</th>
              <th>YEAR</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No results found. This may be due to active filters or no available data
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.Particulars}</td>
                  <td>{Number(row.DayTotal).toFixed(2)}</td>
                  <td>{Number(row.MonthTotal).toFixed(2)}</td>
                  <td>{Number(row.YearTotal).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
