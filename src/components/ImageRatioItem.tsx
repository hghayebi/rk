import React from "react";
import classNames from "classnames";
import { MediaType, deleteMedia } from "../store";
import { GoX } from "react-icons/go";
import { useAppDispatch } from "../hooks/hooks";

export default function ImageRatioItem({
  media,
}: {
  media: MediaType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();

  const divClasses = classNames(
    "w-full h-full flex items-center justify-center relative",
    {
      "flex-col ": media.sizeValue === "1:1" || media.sizeValue === "16:9",
      "": media.sizeValue === "9:16" || media.sizeValue === "4:5",
    }
  );
  const imgClasses = classNames("", {
    "h-[35rem]": media.sizeValue === "9:16" || media.sizeValue === "4:5",
    "w-[35rem]": media.sizeValue === "1:1" || media.sizeValue === "16:9",
  });

  return (
    <div className={divClasses}>
      <img
        className={`object-scale-down max-h-[35rem] max-w-[35rem] ${imgClasses}`}
        src={URL.createObjectURL(media.mediaFile)}
        alt="album pic"
      />
      <GoX
        onClick={() => dispatch(deleteMedia(media))}
        className="text-xl absolute top-1 right-1 cursor-pointer"
      />
    </div>
  );
}
