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
          <table className="table table-bordered mb-0 collection-table" style={{ minWidth: 600 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Receipt No</th>
                <th>Room No</th>
                <th>Guest Name</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Details</th>
                <th>Loger</th>
                <th>SEP</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="text-nowrap">{row.TRDATE?.slice(0, 10)}</td>
                  <td>{row.TRTIME}</td>
                  <td>{row.BILLNO}</td>
                  <td>{row.ROOMNO}</td>
                  <td>{row.GUESTNAME}</td>
                  <td>{row.AMOUNT}</td>
                  <td>{row.moDE?.trim()}</td>
                  <td>{(row.TEMP1 && row.TEMP1.trim() !== '0') ? row.TEMP1 : (row.TEMP2 || '')}</td>
                  <td>{row.LOGER}</td>
                  <td>{row.SEP}</td>
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