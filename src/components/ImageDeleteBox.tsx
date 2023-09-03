import React from "react";
import { GoX } from "react-icons/go";

export default function ImageDeleteBox({
  children,
  handleImageDelete,
}: {
  children: React.ReactNode;
  handleImageDelete: () => void;
}): React.JSX.Element {
  return (
    <div className="border border-dashed p-4 rounded  flex-none relative shadow m-2">
      {children}
      <GoX
        onClick={handleImageDelete}
        className="text-xl absolute top-1 right-1 cursor-pointer"
      />
    </div>
  );
}
