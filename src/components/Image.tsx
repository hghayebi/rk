import React from "react";
import { ImageType, deleteImage, setCurrentImage } from "../store";
import { GoX } from "react-icons/go";
import { useAppDispatch } from "../hooks/hooks";

export default function Image({
  imageItem,
}: {
  imageItem: ImageType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleImageDelete = () => {
    dispatch(deleteImage(imageItem));
  };

  const handleImageClick = () => {
    dispatch(setCurrentImage(imageItem));
  };
  return (
    <div className="border border-dashed p-4 rounded  flex-none relative shadow m-2">
      <img
        onClick={handleImageClick}
        className="h-32 cursor-pointer"
        src={URL.createObjectURL(imageItem.imageFile)}
      />
      <GoX
        onClick={handleImageDelete}
        className="text-xl absolute top-1 right-1 cursor-pointer"
      />
    </div>
  );
}
