import React from "react";
import { useAppSelector } from "../hooks/hooks";
import classNames from "classnames";

export default function ImageRatioItem({
  src,
}: {
  src: string;
}): React.JSX.Element {
  const { currentRatio } = useAppSelector((state) => state.ratio);

  const divClasses = classNames("flex items-center justify-center");
  const imgClasses = classNames(
    "object-cover h-96",
    `aspect-[${currentRatio?.vlaue}]`
  );
  console.log(imgClasses);
  return (
    <div className={divClasses}>
      <img className={imgClasses} src={src} alt="album pic" />
    </div>
  );
}
