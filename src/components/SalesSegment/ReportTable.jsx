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
    // { accessorKey: "Mode", header: "Mode", formatType: "TEXT" },
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

  const flattenedData = useMemo(() => {
    return Object.entries(groupedData).flatMap(([flag, groupData]) => [
      { isGroupHeader: true, groupName: flag, id: `header-${flag}` },
      ...groupData,
    ]);
  }, [groupedData]);

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} columns={columns} tableData={data} />
      </div>
      <div className="card-body">
        <DataGrid data={flattenedData} columns={columns} showPagination={false} disableSorting={true} />
      </div>
    </div>
  );
};

export default ReportTable;
