import React from "react";
import { DataGrid } from "../common/DataGrid";
import Filter from "./Filter";


const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "RoomNo", header: "Room No" },
    {
      accessorKey: "TrDate",
      header: "Check-in Date",
      formatType: "DATE",
    },
    {
      accessorKey: "Fu1",
      header: "Guest Name",
      formatType: "TEXT",
    },
    { accessorKey: "PlanName", header: "Plan Name", formatType: "TEXT" },
    { accessorKey: "Pax", header: "Pax", formatType: "TEXT" },
    {
      accessorKey: "Tariff",
      header: "Rate",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "TaxAmount",
      header: "Room Tax",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "ExtraBed",
      header: "Extrabed",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "PostBillAmount",
      header: "Post Bill",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "FoodAmount",
      header: "Food Bill",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "PlanAmount",
      header: "Plan Amount",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "PlanTax",
      header: "Plan Tax",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "Advance",
      header: "Advance",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "Discount",
      header: "Discount",
      formatType: "AMOUNT",
    },
    {
      accessorKey: "Netamount",
      header: "Net Amount",
      formatType: "AMOUNT",
      highlightAmount: true,
    },
    {
      accessorKey: "Balance",
      header: "Balance",
      formatType: "AMOUNT",
      highlightAmount: true,
    },
  ];


  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} tableData={data} columns={columns}/>
      </div>
      <div className="card-body">
        <DataGrid data={data} columns={columns} disableSorting={true} />
      </div>
    </div>
  );
};

export default ReportTable;
