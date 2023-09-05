import React from "react";
import { GoX } from "react-icons/go";

export default function ImageDeleteBox({
  children,
  handleImageDelete,
  isCurrentImage,
}: {
  children: React.ReactNode;
  handleImageDelete: () => void;
  isCurrentImage: boolean;
}): React.JSX.Element {
  return (
    <div
      className={`border  p-4 rounded  flex-none relative shadow m-2 ${
        isCurrentImage ? "border-blue-500 shadow-lg border-1" : "border-dashed"
      }`}
    >
      {children}
      <GoX
        onClick={handleImageDelete}
        className="text-xl absolute top-1 right-1 cursor-pointer"
      />
    </div>
  );
}
