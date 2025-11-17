import PropTypes from "prop-types";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const ReportTable = ({ data, onFilter }) => {
  // Define columns based on the provided data structure
  const columns = [
    {
      accessorKey: "TrDate",
      header: "Tr Date",
      formatType: "DATE",
    },
    {
      accessorKey: "VoucherNo",
      header: "VoucherNo",
      formatType: "TEXT",
    },
    {
      accessorKey: "LedgerName",
      header: "LedgerName",
      formatType: "TEXT",
    },
    {
      accessorKey: "Particular",
      header: "Particular",
      formatType: "TEXT",
    },
    {
      accessorKey: "Transactions",
      header: "Tr Type",
      formatType: "TEXT",
    },
    {
      accessorKey: "Mode",
      header: "Mode",
      formatType: "TEXT",
    },
    // {
    //   accessorKey: "SubMode",
    //   header: "Sub Mode",
    //   formatType: "TEXT",
    // },
    {
      accessorKey: "Description",
      header: "Description",
      formatType: "TEXT",
    },
    {
      accessorKey: "Amount",
      header: "Amount",
      formatType: "AMOUNT",
    },
  ];

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} columns={columns} tableData={data || []} />
      </div>
      <div className="card-body">
        <DataGrid data={data || []} columns={columns} disableSorting={true} />
      </div>
    </div>
  );
};

ReportTable.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
};

export default ReportTable;
