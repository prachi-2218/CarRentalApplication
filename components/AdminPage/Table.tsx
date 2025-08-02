
import React from "react";

interface ReportTableProps {
  columns: { key: string; label: string }[];
  data: Record<string, any>[];
}


const ReportTable: React.FC<ReportTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-auto mt-6 border rounded-md">
      <table className="min-w-full border-collapse border border-gray-300">
       <thead className="bg-black text-white">
  <tr>
    {columns.map(({ label }) => (
      <th key={label} className="px-4 py-2 border border-gray-300 text-left">
        {label}
      </th>
    ))}
  </tr>
</thead>
<tbody className="bg-white text-gray-900">
  {data.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {columns.map(({ key }) => (
        <td key={key} className="px-4 py-2 border border-gray-300">
          {row[key] !== null && row[key] !== undefined ? row[key] : "-"}
        </td>
      ))}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default ReportTable;
