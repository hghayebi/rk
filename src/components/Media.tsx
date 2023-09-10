import React from "react";
import {
  MediaType,
  deleteMedia,
  setCurrentMedia,
  setCurrentMediaListNull,
  setCurrentSize,
} from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import ImageDeleteBox from "./ImageDeleteBox";

export default function Image({
  mediaItem,
}: {
  mediaItem: MediaType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentMedia } = useAppSelector((state) => state.album);

  const handleImageDelete = () => {
    dispatch(deleteMedia(mediaItem));
    dispatch(setCurrentMediaListNull(mediaItem));
  };

  const handleImageClick = () => {
    dispatch(setCurrentMedia(mediaItem));
    dispatch(setCurrentSize(mediaItem.sizeValue));
    console.log("test");
  };
  return (
    <ImageDeleteBox
      handleImageDelete={handleImageDelete}
      isCurrentImage={currentMedia?.id === mediaItem.id}
    >
      <img
        onClick={handleImageClick}
        className="h-32 cursor-pointer"
        src={URL.createObjectURL(mediaItem.mediaFile)}
      />
    </ImageDeleteBox>
  );
}
