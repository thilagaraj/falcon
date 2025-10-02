import React from "react";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "RoomNo", header: "RoomNo", formatType: "TEXT" },
    { accessorKey: "GuestName", header: "GuestName", formatType: "TEXT" },
    { accessorKey: "Segment", header: "Segment", formatType: "TEXT" },
    { accessorKey: "Pax", header: "Pax", formatType: "TEXT" },
    { accessorKey: "Plan", header: "Plan", formatType: "TEXT" },
    { accessorKey: "TrDate", header: "TrDate", formatType: "DATE"},
    { accessorKey: "Days", header: "Days", formatType: "TEXT" },
    { accessorKey: "Tariff", header: "Tariff", formatType: "AMOUNT" },
    { accessorKey: "RoomTax", header: "RoomTax", formatType: "AMOUNT" },
    { accessorKey: "PalnAmt", header: "PlanAmt", formatType: "AMOUNT" },
    { accessorKey: "PlanTax", header: "PlanTax", formatType: "AMOUNT" },
    { accessorKey: "ExtraBed", header: "ExtraBed", formatType: "AMOUNT" },
    { accessorKey: "FoodBill", header: "FoodBill", formatType: "AMOUNT" },
    { accessorKey: "PostCharge", header: "PostCharge", formatType: "AMOUNT" },
    { accessorKey: "Advance", header: "Advance", formatType: "AMOUNT" },
    { accessorKey: "Discount", header: "Discount", formatType: "AMOUNT" },
    { accessorKey: "NetAmount", header: "NetAmount", formatType: "AMOUNT" },
    { accessorKey: "RoundOff", header: "RoundOff", formatType: "AMOUNT" },
    { accessorKey: "Balance", header: "Balance", formatType: "AMOUNT" },
  ];

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} tableData={data} columns={columns} />
      </div>
      <div className="card-body">
        <DataGrid data={data} columns={columns} disableSorting={true} />
      </div>
    </div>
  );
};

export default ReportTable;
