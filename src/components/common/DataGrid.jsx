import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
//   getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

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

    case "DATE":
      return value ? new Date(value).toLocaleDateString("en-IN") : "";
    
    case "TIME":
      return value ? value?.split('.')?.[0] : "";

    case "TEXT":
    default:
      return value ?? "";
  }
};

export function DataGrid({ columns, data, pageSize = 10, disablePaginationAndSearch = false, disableSorting = false, showPagination = true }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // ...(showPagination ? {
    //   getPaginationRowModel: getPaginationRowModel(),
    //   initialState: {
    //     pagination: {
    //       pageSize,
    //     },
    //   },
    // } : {
    //   getRowModel: getCoreRowModel(),
    // }),
  });

  
  return (
    <div className="dt-container dt-empty-footer">
      {/* {!disablePaginationAndSearch && showPagination && (
        <div className="dt-layout-row">
          <div className="dt-layout-cell dt-layout-start">
            <div className="dt-length">
              <select
                className="dt-input"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <label> entries per page</label>
            </div>
          </div>
          <div className="dt-layout-cell dt-layout-end">
            <div className="dt-search">
              <label htmlFor="dt-search-0">Search:</label>
              <input
                id="dt-search-0"
                className="dt-input"
                type="search"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
        </div>
      )} */}

      <div className="dt-layout-row dt-layout-table">
        <div className="dt-layout-cell dt-layout-full overflow-auto">
          <table className="table bordered-table mb-0 dataTable min-w-full ms-3 ms-sm-0">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (disableSorting) {
                      return (
                        <th key={header.id} className="" tabIndex={-1} role="columnheader">
                          <span className="dt-column-title">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                        </th>
                      );
                    }
                    const isSorted = header.column.getIsSorted();
                    const sortClass =
                      isSorted === "asc"
                        ? "dt-orderable-asc dt-orderable-desc dt-ordering-asc"
                        : isSorted === "desc"
                        ? "dt-orderable-asc dt-orderable-desc dt-ordering-desc"
                        : "dt-orderable-asc dt-orderable-desc";

                    return (
                      <th
                        key={header.id}
                        className={sortClass}
                        onClick={header.column.getToggleSortingHandler()}
                        tabIndex={0}
                        role="columnheader"
                      >
                        <span className="dt-column-title" role="button">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <span className="dt-column-order"></span>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {table.getRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getAllLeafColumns().length}>
                    <div
                      className="alert alert-primary bg-primary-50 text-primary-600 border-primary-50 px-24 py-11 mb-0 radius-8 d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <Icon
                          icon="mdi:information-outline"
                          className="icon text-xl"
                        />
                        No results found. This may be due to active filters or no available data
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  // Check if this is the summary row (PlanName === 'Total Summary')
                  if (row.original.isGroupHeader) {
                    return (
                      <tr key={row.id} className="group-header-row">
                        <td
                          colSpan={table.getAllLeafColumns().length}
                          className="p-0"
                        >
                          <p className="fw-bold m-0 text-primary-dark text-decoration-underline">
                            {row.original.groupName}
                          </p>
                        </td>
                      </tr>
                    );
                  }

                  const isSummaryRow = row.original && (row.original.PlanName === 'Total Summary' || row.original.GuestName === 'Total Pax');
                  return (
                    <tr key={row.id} className={isSummaryRow ? 'summary-row-bg' : ''}>
                      {row.getVisibleCells().map((cell) => {
                        const { columnDef } = cell.column;
                        const value = cell.getValue();

                        const formatted = columnDef.formatType
                          ? formatCellValue(value, columnDef.formatType)
                          : flexRender(columnDef.cell, cell.getContext());

                        const isHighlightedAmount =
                          columnDef.formatType === "AMOUNT" &&
                          columnDef.highlightAmount === true &&
                          typeof value === "number";

                        const textColorClass = isHighlightedAmount
                          ? value < 0
                            ? "text-danger-700 font-semibold"
                            : "text-success-700 font-semibold"
                          : "";

                        return (
                          <td key={cell.id} className={textColorClass}>
                            {formatted}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/* {!disablePaginationAndSearch && showPagination &&(
        <div className="dt-layout-row">
          <div className="dt-layout-cell dt-layout-start">
            <div className="dt-info" aria-live="polite" role="status">
              Showing{" "}
              {table.getRowModel().rows.length
                ? `${
                    table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                    1
                  }
           to
           ${
             table.getState().pagination.pageIndex *
               table.getState().pagination.pageSize +
             table.getRowModel().rows.length
           }
           of
           ${table.getPrePaginationRowModel().rows.length}`
                : "0"}{" "}
              entries
            </div>
          </div>

          <div className="dt-layout-cell dt-layout-end">
            <div className="dt-paging">
              <nav aria-label="pagination">
                <button
                  type="button"
                  className={`dt-paging-button first ${
                    !table.getCanPreviousPage() ? "disabled" : ""
                  }`}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="First"
                >
                  «
                </button>

                <button
                  type="button"
                  className={`dt-paging-button previous ${
                    !table.getCanPreviousPage() ? "disabled" : ""
                  }`}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Previous"
                >
                  ‹
                </button>

                {Array.from({ length: table.getPageCount() }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`dt-paging-button ${
                      table.getState().pagination.pageIndex === i ? "current" : ""
                    }`}
                    onClick={() => table.setPageIndex(i)}
                    aria-current={
                      table.getState().pagination.pageIndex === i
                        ? "page"
                        : undefined
                    }
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  type="button"
                  className={`dt-paging-button next ${
                    !table.getCanNextPage() ? "disabled" : ""
                  }`}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Next"
                >
                  ›
                </button>

                <button
                  type="button"
                  className={`dt-paging-button last ${
                    !table.getCanNextPage() ? "disabled" : ""
                  }`}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  aria-label="Last"
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

DataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  disablePaginationAndSearch: PropTypes.bool,
  disableSorting: PropTypes.bool,
};
