import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import UploadImage from "./UploadImage";
import { setCurrentImage } from "../store";

export default function ShowImage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentImage, images } = useAppSelector((state) => state.album);
  let currentImageIndex = -1;
  console.log(currentImageIndex);
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
    content = <UploadImage />;
  } else {
    content = (
      <img
        className=" h-96"
        src={URL.createObjectURL(currentImage.imageFile)}
      />
    );
  }
  return (
    <div>
      <div className="border rounded shadow flex flex-col items-center gap-20  min-h-fit max-w-sm min-w-fit  mx-auto">
        <div className="flex items-center justify-between ">
          <IoIosArrowForward
            onClick={handleArrowForwardClick}
            className="text-5xl cursor-pointer p-2 rounded hover:bg-gray-100"
          />
          <div className="px-10 py-10">{content}</div>
          <IoIosArrowBack
            onClick={handleArrowBackClick}
            className="text-5xl cursor-pointer p-2 rounded hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
