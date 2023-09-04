import React, { useEffect } from "react";
import { BsImage, BsPlus } from "react-icons/bs";
import { RatioType, setCurrentImage, setCurrentRatio } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const btnItems: Array<RatioType> = [
  {
    label: "1:1",
    vlaue: "1/1",
  },
  {
    label: "9:16",
    vlaue: "9/16",
  },
  {
    label: "16:9",
    vlaue: "16/9",
  },
  {
    label: "4:5",
    vlaue: "4/5",
  },
];

export default function ChangeAspectRatioMenu(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentRatio } = useAppSelector((state) => state.ratio);

  useEffect(() => {
    dispatch(setCurrentRatio(btnItems[0]));
  }, [dispatch]);

  const handleRatioButtonClick = (btn: RatioType) => {
    dispatch(setCurrentRatio(btn));
  };

  const handleAddClick = () => {
    dispatch(setCurrentImage(null));
  };

  const renderedButtons = btnItems.map((btn) => {
    const isActive = btn.label === currentRatio?.label;
    return (
      <button
        onClick={() => handleRatioButtonClick(btn)}
        key={btn.vlaue}
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
      <button
        onClick={handleAddClick}
        className="py-2 shadow px-4 rounded flex items-center "
      >
        <BsPlus className="text-xl" />
        <BsImage className="" />
      </button>
      {renderedButtons}
    </div>
  );
}
