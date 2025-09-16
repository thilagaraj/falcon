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


  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} tableData={data} columns={columns} />
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

ReportTable.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
};

export default ReportTable;
