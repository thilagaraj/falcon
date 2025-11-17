import { useMemo } from "react";
import PropTypes from "prop-types";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";

const formatCellValue = (value, formatType) => {
  switch (formatType) {
    case "AMOUNT":
      return typeof value === "number"
        ? new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          }).format(value)
        : "";

    case "PERCENT":
      return typeof value === "number" ? `${value.toFixed(2)}%` : "";

    case "NUMBER":
      return typeof value === "number" 
        ? new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value)
        : "";

    case "TEXT":
    default:
      return value ?? "";
  }
};

const ReportTable = ({ data, onFilter }) => {
  // Transform data and generate columns dynamically
  const { transformedData, columns } = useMemo(() => {
    if (!data || data.length === 0) {
      return { transformedData: [], columns: [] };
    }

    // Extract all unique hotel names from the data
    const hotelNames = new Set();
    data.forEach((item) => {
      if (item.HotelValues) {
        Object.keys(item.HotelValues).forEach((hotel) => hotelNames.add(hotel));
      }
    });

    const hotelNamesArray = Array.from(hotelNames);

    // Create columns dynamically
    const cols = [
      {
        accessorKey: "Particulars",
        header: "Particulars",
        formatType: "TEXT",
      },
    ];

    // Add a column for each hotel with custom cell rendering
    hotelNamesArray.forEach((hotelName) => {
      cols.push({
        accessorKey: hotelName,
        header: hotelName,
        cell: ({ row }) => {
          const value = row.original[hotelName];
          const particular = row.original.Particulars?.toLowerCase() || "";
          
          // Determine format based on Particulars
          if (particular.includes("%") || particular.includes("percent") || particular.includes("occupany")) {
            return formatCellValue(value, "PERCENT");
          } else if (
            particular.includes("rooms") || 
            particular.includes("occupied") || 
            particular.includes("checkin") || 
            particular.includes("reservation") ||
            particular.includes("pax")
          ) {
            // These are counts, not amounts
            return formatCellValue(value, "NUMBER");
          } else {
            // Default to amount format
            return formatCellValue(value, "AMOUNT");
          }
        },
      });
    });

    // Transform data to match column structure
    const transformed = data.map((item) => {
      const row = {
        Particulars: item.Particulars,
      };

      // Map hotel values to row
      hotelNamesArray.forEach((hotelName) => {
        row[hotelName] = item.HotelValues?.[hotelName] ?? 0;
      });

      return row;
    });

    return { transformedData: transformed, columns: cols };
  }, [data]);

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <Filter onFilter={onFilter} columns={columns} tableData={transformedData} />
      </div>
      <div className="card-body">
        <DataGrid data={transformedData} columns={columns} disableSorting={true} />
      </div>
    </div>
  );
};

ReportTable.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
};

export default ReportTable;
