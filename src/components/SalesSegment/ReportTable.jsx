import React, { useMemo } from "react";
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

  const groupedData = useMemo(() => {
    if (!data || data.length === 0) {
      return {};
    }
    return data.reduce((acc, item) => {
      const Mode = item.Mode;
      if (!acc[Mode]) {
        acc[Mode] = [];
      }
      acc[Mode].push(item);
      return acc;
    }, {});
  }, [data]);

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} columns={columns} tableData={data} />
      </div>
      {Object.entries(groupedData).map(([flag, groupData]) => (
        <div className="card-body" key={flag}>
          <h5 className="fw-semibold mb-3 p-2 bg-light border rounded-2 text-center text-primary-dark">
            {flag}
          </h5>
          <DataGrid data={groupData} columns={columns} showPagination={false} />
        </div>
      ))}
    </div>
  );
};

export default ReportTable;
