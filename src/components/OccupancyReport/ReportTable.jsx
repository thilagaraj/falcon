import React from "react";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "RoomNo", header: "RoomNo", formatType: "TEXT" },
    { accessorKey: "RoomCode", header: "RoomCode", formatType: "TEXT" },
    { accessorKey: "GuestName", header: "GuestName", formatType: "TEXT" },
    { accessorKey: "Pax", header: "Pax", formatType: "TEXT" },
    { accessorKey: "ChildPax", header: "C-Pax", formatType: "TEXT" },
    { accessorKey: "CompanyName", header: "CompanyName", formatType: "TEXT" },
    { accessorKey: "ArrivalDate", header: "ArrivalDate", formatType: "DATE" },
    { accessorKey: "Arivaltime", header: "ArivalTime", formatType: "TEXT" },
    { accessorKey: "DepatureDate", header: "Dep.Date", formatType: "DATE" },
    { accessorKey: "PlanName", header: "Plan", formatType: "TEXT" },
    { accessorKey: "SourceType", header: "Source", formatType: "TEXT" },
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
