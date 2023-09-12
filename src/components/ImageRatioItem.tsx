import React from "react";
import classNames from "classnames";
import { MediaType, deleteMedia } from "../store";
import { GoX } from "react-icons/go";
import { useAppDispatch } from "../hooks/hooks";
import LogoBox from "./LogoBox";

export default function ImageRatioItem({
  media,
}: {
  media: MediaType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();

  const divClasses = classNames(" flex items-center justify-center relative ", {
    "flex-col w-full h-full": media.sizeValue === "1:1",
    "flex-col w-full h-[19.6875rem]": media.sizeValue === "16:9",
    " h-full w-[19.6875rem]": media.sizeValue === "9:16",
    "h-full w-[28rem]": media.sizeValue === "4:5",
  });
  const imgClasses = classNames("", {
    "h-full w-[100%]": media.sizeValue === "9:16",
    "h-full w-[100%] ": media.sizeValue === "4:5",
    "w-full h-[100%]": media.sizeValue === "1:1",
    "w-full h-[100%] ": media.sizeValue === "16:9",
  });

  return (
    <div className={divClasses}>
      <img
        className={`object-cover   ${imgClasses}`}
        src={URL.createObjectURL(media.mediaFile)}
        alt="album pic"
      />
      <GoX
        onClick={() => dispatch(deleteMedia(media))}
        className="text-xl absolute top-1 right-1 cursor-pointer"
      />
      <LogoBox />
    </div>
  );
}
