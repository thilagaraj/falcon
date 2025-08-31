import React from "react";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "Particulars", header: "OutLet", formatType: "TEXT" },
    { accessorKey: "DayTotal", header: "DAY", formatType: "AMOUNT" },
    { accessorKey: "MonthTotal", header: "MONTH", formatType: "AMOUNT" },
    { accessorKey: "YearTotal", header: "YEAR", formatType: "AMOUNT" },
  ];

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} tableData={data} columns={columns} />
      </div>
      <div className="card-body">
        <DataGrid data={data} columns={columns} showPagination={false} />
      </div>
    </div>
  );
};

export default ReportTable;
