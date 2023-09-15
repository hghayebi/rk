import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { MediaType, deleteMedia, setMediaContainerPosition } from "../store";
import { GoXCircleFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LogoBox from "./LogoBox";

export default function ImageRatioItem({
  media,
}: {
  media: MediaType;
}): React.JSX.Element {
  const [deleteButton, setDeleteButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { inSendPage } = useAppSelector((state) => state.album);

  useEffect(() => {
    const r = ref.current;
    dispatch(setMediaContainerPosition(r?.getBoundingClientRect() as DOMRect));
    console.log("c: ", r?.getBoundingClientRect().bottom);
    console.log("c: ", r?.getBoundingClientRect().right);

    // const listner = () => {
    //   dispatch(
    //     setMediaContainerPosition(r?.getBoundingClientRect() as DOMRect)
    //   );
    //   console.log("c: ", r?.getBoundingClientRect());
    // };

    // r?.addEventListener("load", listner);
    // return () => {
    //   r?.removeEventListener("load", listner);
    // };
  }, [dispatch]);

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
    <div
      ref={ref}
      className={divClasses}
      onMouseEnter={() => setDeleteButton(true)}
      onMouseLeave={() => setDeleteButton(false)}
    >
      <img
        className={`object-cover   ${imgClasses} shadow`}
        src={URL.createObjectURL(media.mediaFile)}
        alt="album pic"
      />
      {deleteButton && !inSendPage && (
        <GoXCircleFill
          onClick={() => dispatch(deleteMedia(media))}
          className="text-2xl absolute top-1 right-1 cursor-pointer text-slate-400 hover:text-slate-500 bg-slate-300 rounded-full"
        />
      )}
      <LogoBox />
    </div>
  );
}
