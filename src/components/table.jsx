import React from "react";
import { useState } from "react";

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Get table headers from object keys
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-md border-2 bg-amber-100 text-neutral-800 shadow-lg">
      <table className="min-w-full border-2 rounded-md overflow-hidden">
        <thead className="bg-amber-50 border-b-3 justify-center rounded-md">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left font-semibold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-amber-50" : "bg-amber-100"}
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
