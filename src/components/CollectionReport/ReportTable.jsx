import React from "react";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "TRDATE", header: "Date", cell: info => info.getValue()?.slice(0, 10) },
    { accessorKey: "TRTIME", header: "Time" },
    { accessorKey: "BILLNO", header: "Receipt No" },
    { accessorKey: "ROOMNO", header: "Room No" },
    { accessorKey: "GUESTNAME", header: "Guest Name" },
    { accessorKey: "AMOUNT", header: "Amount", formatType: "AMOUNT", highlightAmount: true },
    { accessorKey: "moDE", header: "Mode", cell: info => info.getValue()?.trim() },
    { accessorKey: "TEMP1", header: "Details", cell: info => (info.row.original.TEMP1 && info.row.original.TEMP1.trim() !== '0') ? info.row.original.TEMP1 : (info.row.original.TEMP2 || '') },
    { accessorKey: "LOGER", header: "Loger" },
    { accessorKey: "SEP", header: "SEP" },
  ];

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} columns={columns} tableData={data} />
      </div>
      <div className="card-body">
        <DataGrid data={data} columns={columns} showPagination={false} disableSorting={true} />
      </div>
    </div>
  );
};

export default ReportTable;