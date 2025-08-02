import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



// Export to CSV or XLS
export const exportToExcel = (
  reportData: any[],
  // columns: string[],
  type: "csv" | "xls"
) => {
  if (!reportData || reportData.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(reportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: type === "csv" ? "csv" : "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      type === "csv"
        ? "text/csv;charset=utf-8"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `report.${type}`);
};


export const exportToPDF = (reportData: any[], columns: string[]) => {
  if (!reportData || reportData.length === 0) return;

  const doc = new jsPDF();

  const tableRows = reportData.map((row) =>
    columns.map((col) => row[col] ?? "")
  );

  autoTable(doc, {
    head: [columns],
    body: tableRows,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [220, 53, 69] },
    startY: 20,
  });

  doc.save("report.pdf");
};

