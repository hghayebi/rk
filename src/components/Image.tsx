import React from "react";
import { ImageType, deleteImage, setCurrentImage } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import ImageDeleteBox from "./ImageDeleteBox";

export default function Image({
  imageItem,
}: {
  imageItem: ImageType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentImage } = useAppSelector((state) => state.album);

  const handleImageDelete = () => {
    dispatch(deleteImage(imageItem));
  };

  const handleImageClick = () => {
    dispatch(setCurrentImage(imageItem));
  };
  return (
    <ImageDeleteBox
      handleImageDelete={handleImageDelete}
      isCurrentImage={currentImage?.id === imageItem.id}
    >
      <img
        onClick={handleImageClick}
        className="h-32 cursor-pointer"
        src={URL.createObjectURL(imageItem.imageFile)}
      />
    </ImageDeleteBox>
  );
}
