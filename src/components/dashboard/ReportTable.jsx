import React, { useMemo } from "react";
import { DataGrid } from "../common/DataGrid";
import RoomAvailabilityFilter from "./RoomAvailabilityFilter";

// Helper to format date as YYYY-MM-DD
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
};

const ReportTable = ({ data = [], onFilter, toDate }) => {
  // Memoize columns and rows for performance
  const { columns, rows } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        columns: [
          { accessorKey: "RoomType", header: "Room Type" },
        ],
        rows: [],
      };
    }

    // Collect all unique dates
    const dateSet = new Set();
    data.forEach((item) => {
      item.Rooms.forEach((room) => {
        dateSet.add(formatDate(room.ProcessDate));
      });
    });
    const dates = Array.from(dateSet).sort();

    // Build columns: RoomType + each date
    const columns = [
      { accessorKey: "RoomType", header: "Room Type" },
      ...dates.map((date) => ({
        accessorKey: date,
        header: date,
        formatType: "TEXT",
      })),
    ];

    // Build rows: { RoomType, [date]: rooms, ... }
    const rows = data.map((item) => {
      const row = { RoomType: item.RoomType };
      item.Rooms.forEach((room) => {
        row[formatDate(room.ProcessDate)] = room.Rooms;
      });
      // Fill missing dates with 0 or ""
      dates.forEach((date) => {
        if (!(date in row)) row[date] = 0;
      });
      return row;
    });

    return { columns, rows };
  }, [data]);

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <RoomAvailabilityFilter onFilter={onFilter} tableData={rows} columns={columns} toDate={toDate} />
      </div>
      <div className="card-body">
        <DataGrid data={rows} columns={columns} />
      </div>
    </div>
  );
};

export default ReportTable;
