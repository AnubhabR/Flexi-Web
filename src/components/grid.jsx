import React from "react";
import Card from "./card";

const Grid = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-center mx-auto w-full max-w-5xl p-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-center">
          <Card {...item} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
