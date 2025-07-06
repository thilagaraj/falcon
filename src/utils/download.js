import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const downloadPDF = (headers, tableData) => {
  const doc = new jsPDF();
  if (tableData.length === 0) {
    doc.text("No data to export", 10, 10);
  } else {
    const exportColumns = headers.map((col) => ({key: col.accessorKey, header: col.header}));
    const columns = exportColumns.map((col) => col.header);
    const rows = tableData.map((row) =>
      exportColumns.map((col) => row[col.key])
    );
    autoTable(doc, { head: [columns], body: rows });
  }
  doc.save("table-data.pdf");
};

const downloadExcel = (headers, tableData) => {
  if (tableData.length === 0) return;
  const exportColumns = headers.map((col) => ({key: col.accessorKey, header: col.header}));
  const exportData = tableData.map((row) => {
    const obj = {};
    exportColumns.forEach((col) => {
      obj[col.header] = row[col.key];
    });
    return obj;
  });
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "table-data.xlsx");
};

export { downloadExcel, downloadPDF };
