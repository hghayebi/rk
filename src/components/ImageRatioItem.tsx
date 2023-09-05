import React from "react";
import { useAppSelector } from "../hooks/hooks";
import classNames from "classnames";

export default function ImageRatioItem({
  src,
}: {
  src: string;
}): React.JSX.Element {
  const { currentRatio } = useAppSelector((state) => state.ratio);

  const divClasses = classNames(" ", {
    "flex items-center justify-center":
      currentRatio?.vlaue === "1/1" ||
      currentRatio?.vlaue === "9/16" ||
      currentRatio?.vlaue === "4/5",
    "w-96 my-20": currentRatio?.vlaue === "16/9",
  });
  const imgClasses = classNames(
    "object-cover",
    `aspect-[${currentRatio?.vlaue}]`,
    {
      "h-96 aspect-[1/1]": currentRatio?.vlaue === "1/1",
      "h-96 aspect-[9/16]": currentRatio?.vlaue === "9/16",
      "h-96 aspect-[4/5]": currentRatio?.vlaue === "4/5",

      "w-96 aspect-video": currentRatio?.vlaue === "16/9",
    }
  );

  return (
    <div className={divClasses}>
      <img className={imgClasses} src={src} alt="album pic" />
    </div>
  );
}
