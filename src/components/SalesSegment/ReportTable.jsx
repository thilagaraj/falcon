import React from "react";
import Filter from "./Filter";

const ReportTable = ({ data, onFilter }) => {
  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} />
      </div>
      <div className="card-body" style={{ maxHeight: 400, overflowY: 'auto' }}>
        <div className="responsive-table">
          <table className="table table-bordered mb-0 sales-segment-table">
            <thead>
              <tr>
                <th>Particualr</th>
                <th>Amount</th>
                {/* <th>Allowence</th>
                <th>DayAmt</th> */}
                <th>YearNet</th>
                <th>Mode</th>
                <th>GRADE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.Particualr}</td>
                  <td>{row.Amount}</td>
                  {/* <td>{row.Allowence}</td> */}
                  {/* <td>{row.DayAmt}</td> */}
                  <td>{row.YearNet}</td>
                  <td>{row.Mode}</td>
                  <td>{row.GRADE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;