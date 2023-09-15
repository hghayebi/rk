import React from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppSelector } from "../hooks/hooks";
// import { setCurrentMedia } from "../store";
import { MediaDropzone } from "./MediaDropzone";
import ImageRatioItem from "./ImageRatioItem";

export default function ShowMedia(): React.JSX.Element {
  // const dispatch = useAppDispatch();
  const { currentMedia, inSendPage } = useAppSelector((state) => state.album);
  // let currentMediaIndex = -1;
  // medias.forEach((image, index) => {
  //   if (image.id === currentMedia?.id) {
  //     if (index === medias.length - 1) {
  //       currentMediaIndex = index - 1;
  //       return;
  //     }
  //     currentMediaIndex = index;
  //   }
  // });

  // const handleArrowBackClick = () => {
  //   dispatch(setCurrentMedia(medias[currentMediaIndex + 1]));
  // };

  // const handleArrowForwardClick = () => {
  //   dispatch(setCurrentMedia(medias[currentMediaIndex - 1]));
  // };

  let content;
  let bg = "";
  if (!currentMedia) {
    if (inSendPage) content = null;
    else content = <MediaDropzone />;
  } else {
    // bg = "bg-gray-900";
    bg = "";
    try {
      content = <ImageRatioItem media={currentMedia} />;
    } catch (error) {
      console.log(currentMedia);
      content = <div>Error happend</div>;
    }
  }
  return (
    <div className="">
      <div className={`  rounded   mb-4  ${bg}`}>
        <div className=" w-[35rem] h-[35rem]  flex items-center justify-center">
          {content}
        </div>
      </div>
    </div>
  );
}
