import React, { useEffect } from "react";
import { BsImage, BsPlus } from "react-icons/bs";
import {
  SizeType,
  setApprove,
  setCurrentMedia,
  setCurrentSize,
  setRatios,
} from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const btnItems: Array<{
  label: SizeType;
  value: string;
  haveContent: boolean;
}> = [
  {
    label: "1:1",
    value: "1/1",
    haveContent: false,
  },
  {
    label: "9:16",
    value: "9/16",
    haveContent: false,
  },
  {
    label: "16:9",
    value: "16/9",
    haveContent: false,
  },
  {
    label: "4:5",
    value: "4/5",
    haveContent: false,
  },
];

export default function ChangeAspectRatioMenu(): React.JSX.Element {
  const dispatch = useAppDispatch();

  // const { currentRatio } = useAppSelector((state) => state.ratio);
  const { medias, currentSize } = useAppSelector((state) => state.album);

  useEffect(() => {
    dispatch(setCurrentSize(btnItems[0].label));
    dispatch(setRatios(btnItems));
  }, [dispatch]);

  useEffect(() => {}, [medias]);

  const handleRatioButtonClick = (btn: { label: string; value: string }) => {
    dispatch(setCurrentSize(btn.label));
    const media = medias.find((media) => media.sizeValue === btn.label);
    if (media) {
      dispatch(setCurrentMedia(null));
      setTimeout(() => {
        dispatch(setCurrentMedia(media));
      }, 0.0001);
    } else {
      dispatch(setCurrentMedia(null));
    }
  };

  const handleAddClick = () => {
    dispatch(setApprove());
  };

  const renderedButtons = btnItems.map((btn) => {
    const isActive = btn.label === currentSize;
    let haveContent = false;
    medias.map((media) => {
      if (btn.label === media.sizeValue) {
        haveContent = true;
      }
    });
    return (
      <button
        onClick={() => handleRatioButtonClick(btn)}
        key={btn.value}
        className={`text-sm py-2 px-4 rounded shadow  ${
          isActive
            ? "border"
            : " border-blue-500 hover:bg-blue-600 active:bg-blue-500 bg-blue-500 text-stone-100 "
        } ${haveContent ? "border-green-500 border-2  " : ""}`}
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
