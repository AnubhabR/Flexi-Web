import React from "react";
import { useState } from 'react';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Get table headers from object keys
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-md border border-gray-700 bg-gray-800 shadow-lg">
      <table className="min-w-full">
        <thead className="bg-gray-900 text-amber-50">
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
        <tbody className="divide-y divide-gray-700 text-amber-50">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-700 transition-colors duration-200">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2"
                >
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

// The main App component to demonstrate the Table
const App = () => {
  const users = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { name: 'Peter Jones', age: 45, city: 'Chicago' },
    { name: 'Mary Williams', age: 22, city: 'Houston' },
  ];

  return (
    <div className="flex flex-col gap-4 w-1/5 min-w-[300px] bg-gray-800 border rounded-md p-4">
      <h1 className="text-3xl font-bold text-amber-50 mb-8">User Data</h1>
      <div className="w-full max-w-4xl">
        <Table data={users} />
      </div>
    </div>
  );
};

export default App;
