import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";
import PropTypes from "prop-types";
import { useMemo } from "react";

const ReportTable = ({ data, onFilter }) => {
  const columns = [
    { accessorKey: "Particulars", header: "OutLet", formatType: "TEXT" },
    { accessorKey: "DayTotal", header: "DAY", formatType: "AMOUNT" },    
    { accessorKey: "MonthTotal", header: "MONTH", formatType: "AMOUNT" },
    { accessorKey: "YearTotal", header: "YEAR", formatType: "AMOUNT" },
  ];

    const groupedData = useMemo(() => {
    if (!data || data.length === 0) {
      return {};
    }
    return data.reduce((acc, item) => {
      const flag = item.Flag ;
      if (!acc[flag]) {
        acc[flag] = [];
      }
      acc[flag].push(item);
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
        <Filter onFilter={onFilter} tableData={data} columns={columns} />
      </div>
       <div className="card-body">
               <DataGrid data={flattenedData} columns={columns} showPagination={false} disableSorting={true} />
             </div>
    </div>
  );
};

ReportTable.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
};

export default ReportTable;
