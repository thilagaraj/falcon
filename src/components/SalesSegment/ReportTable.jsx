import React from "react";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "Particualr", header: "Particualr", formatType: "TEXT" },
    {
      accessorKey: "Amount",
      header: "Amount",
      formatType: "AMOUNT",
      highlightAmount: true,
    },
    { accessorKey: "YearNet", header: "YearNet", formatType: "AMOUNT" },
    { accessorKey: "Mode", header: "Mode", formatType: "TEXT" },
    { accessorKey: "GRADE", header: "GRADE", formatType: "TEXT" },
    { accessorKey: "Allowence", header: "Allowence", formatType: "AMOUNT" },
    { accessorKey: "DayAmt", header: "DayAmt", formatType: "AMOUNT" },
  ];

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} columns={columns} tableData={data} />
      </div>
      <div className="card-body">
        <DataGrid data={data} columns={columns} />
      </div>
    </div>
  );
};

export default ReportTable;
