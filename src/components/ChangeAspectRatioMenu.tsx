import React from "react";
import { BsImage, BsPlus } from "react-icons/bs";

export default function ChangeAspectRatioMenu(): React.JSX.Element {
  const btnItems: Array<{ label: string; name: string }> = [
    {
      label: "1:1",
      name: "squre",
    },
    {
      label: "9:16",
      name: "Stories",
    },
    {
      label: "16:9",
      name: "Landscape Video",
    },
    {
      label: "4:5",
      name: "Portrate",
    },
  ];
  const renderedButtons = btnItems.map((btn) => {
    const isActive = btn.label === "1:1";
    return (
      <button
        key={btn.name}
        className={`text-sm py-2 px-4 rounded shadow  hover:bg-blue-600 active:bg-blue-500 ${
          isActive ? "border border-blue-500" : " bg-blue-500 text-stone-100 "
        }`}
      >
        {btn.label}
      </button>
    );
  });
  return (
    <div className="flex flex-col gap-3">
      <button className="py-2 shadow px-4 rounded flex items-center ">
        <BsPlus className="text-xl" />
        <BsImage className="" />
      </button>
      {renderedButtons}
    </div>
  );
}
