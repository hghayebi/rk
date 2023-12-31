import React, { useState } from "react";
import { GoXCircleFill } from "react-icons/go";
import { useAppSelector } from "../hooks/hooks";

export default function ImageDeleteBox({
  children,
  handleImageDelete,
  isCurrentImage,
  hasPrice,
  hasSalesMethod,
}: {
  children: React.ReactNode;
  handleImageDelete: () => void;
  isCurrentImage: boolean;
  hasPrice?: boolean;
  hasSalesMethod?: boolean;
}): React.JSX.Element {
  const { inSendPage } = useAppSelector((state) => state.album);
  const [deleteButton, setDeleteButton] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setDeleteButton(true)}
      onMouseLeave={() => setDeleteButton(false)}
      className={`border  p-4 rounded  flex-none relative shadow m-2  hover:scale-110 hover:duration-700	 ${
        isCurrentImage ? "border-blue-500 shadow-lg border-1" : "border-dashed"
      } ${
        hasPrice && hasSalesMethod
          ? "border-green-600 border-2"
          : "border-solid"
      }`}
    >
      {children}
      {deleteButton && !inSendPage && (
        <GoXCircleFill
          onClick={handleImageDelete}
          className="text-xl absolute top-1 right-1 cursor-pointer text-slate-400 hover:text-slate-500 bg-slate-300 rounded-full "
        />
      )}
    </div>
  );
}
