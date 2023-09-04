import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setCurrentMedia } from "../store";
import { MediaDropzone } from "./MediaDropzone";
import ImageRatioItem from "./ImageRatioItem";

export default function ShowMedia(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentMedia, medias } = useAppSelector((state) => state.album);
  let currentMediaIndex = -1;
  medias.forEach((image, index) => {
    if (image.id === currentMedia?.id) {
      if (index === medias.length - 1) {
        currentMediaIndex = index - 1;
        return;
      }
      currentMediaIndex = index;
    }
  });

  const handleArrowBackClick = () => {
    dispatch(setCurrentMedia(medias[currentMediaIndex + 1]));
  };

  const handleArrowForwardClick = () => {
    dispatch(setCurrentMedia(medias[currentMediaIndex - 1]));
  };

  let content;

  if (!currentMedia) {
    content = <MediaDropzone />;
  } else {
    content = (
      <ImageRatioItem src={URL.createObjectURL(currentMedia.mediaFile)} />
    );
  }
  return (
    <div>
      <div className="border rounded shadow w-[30rem]  mx-auto">
        <div className="flex items-center justify-between align-middle">
          <IoIosArrowForward
            onClick={handleArrowForwardClick}
            className="text-5xl cursor-pointer rounded hover:bg-gray-100"
          />
          <div className="w-96 h-96 ">{content}</div>
          <IoIosArrowBack
            onClick={handleArrowBackClick}
            className="text-5xl cursor-pointer  rounded hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
