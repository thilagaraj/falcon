import { useMemo } from "react";
import { DataGrid } from "../common/DataGrid";
import RoomAvailabilityFilter from "./RoomAvailabilityFilter";
import { formatHeaderDate, toIsoDate } from "../../utils/date";
import PropTypes from "prop-types";

const headerDate = (dateStr) => {
  const {day, month, weekday} = formatHeaderDate(dateStr);
  return (
    <span>
      {`${day} ${month}`}<br />
      <span style={{ color: '#b0b7c3', fontSize: '12px' }}>{weekday}</span>
    </span>
  );
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
        dateSet.add(toIsoDate(room.ProcessDate));
      });
    });
    const dates = Array.from(dateSet).sort();

    // Build columns: RoomType + each date
    const columns = [
      { accessorKey: "RoomType", header: "Room Type" },
      ...dates.map((date) => ({
        accessorKey: date,
        header: headerDate(date),
        formatType: "TEXT",
      })),
    ];

    // Build rows: { RoomType, [date]: rooms, ... }
    const rows = data.map((item) => {
      const row = { RoomType: item.RoomType };
      item.Rooms.forEach((room) => {
        row[toIsoDate(room.ProcessDate)] = room.Rooms;
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

ReportTable.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
  toDate: PropTypes.any,
};

export default ReportTable;
