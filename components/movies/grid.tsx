import Image from "next/image";
import React from "react";

interface GridProps {
  items: React.ReactNode[];
}

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 border rounded shadow">
            <Image
            src={item?.url}
            alt="cast image"
            width={50}
            height={50}
            />
          {item}
        </div>
      ))}
    </div>
  );
};

export default Grid;
