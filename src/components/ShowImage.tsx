import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setCurrentImage } from "../store";
import { ImageDropzone } from "./ImageDropzone";
import ImageRatioItem from "./ImageRatioItem";

export default function ShowImage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentImage, images } = useAppSelector((state) => state.album);
  let currentImageIndex = -1;
  images.forEach((image, index) => {
    if (image.id === currentImage?.id) {
      if (index === images.length - 1) {
        currentImageIndex = index - 1;
        return;
      }
      currentImageIndex = index;
    }
  });

  const handleArrowBackClick = () => {
    dispatch(setCurrentImage(images[currentImageIndex + 1]));
  };

  const handleArrowForwardClick = () => {
    dispatch(setCurrentImage(images[currentImageIndex - 1]));
  };

  let content;

  if (!currentImage) {
    content = <ImageDropzone />;
  } else {
    content = (
      <ImageRatioItem src={URL.createObjectURL(currentImage.imageFile)} />
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
