import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import {
  MediaType,
  setCurrentMedia,
  setLogoOffset,
  setLogoSize,
} from "../store";
import Draggable from "react-draggable";

export default function LogoBox(): React.JSX.Element {
  // const [bottom, setBottom] = useState(0);
  // const [right, setRight] = useState(0);

  const dispatch = useAppDispatch();
  const { currentMedia } = useAppSelector((state) => state.album);

  const ref = useRef<HTMLDivElement>(null);

  // b = currentMedia?.logoOffset?.bottom;

  // r = currentMedia?.logoOffset?.right;

  // useEffect(() => {
  //   setBottom(currentMedia?.logoOffset?.bottom);
  //   setRight(currentMedia?.logoOffset?.right);
  //   console.log("b: " + bottom);
  //   console.log("r: " + right);
  // }, [currentMedia, bottom, right]);

  // useEffect(() => {
  //   console.log("currentmedia changed");
  // }, [currentMedia]);

  return (
    <Draggable
      // defaultClassName={`  absolute bottom-0 right-0 `}
      onStop={() => {
        dispatch(
          setLogoOffset(ref.current?.getBoundingClientRect() as DOMRect)
        );
        if (currentMedia) {
          // dispatch(
          //   setCurrentMedia({
          //     ...currentMedia,
          // logoOffset: {
          //   bottom:
          //     ref.current?.getBoundingClientRect().bottom -
          //     currentMedia.mediaContainerPosition?.bottom,
          //   right:
          //     ref.current?.getBoundingClientRect().right -
          //     currentMedia.mediaContainerPosition?.right,
          // },
          //   })
          // );
          console.log(
            `currentmedia: logoOffset:b: ${currentMedia.logoOffset.bottom} r: ${currentMedia.logoOffset.right}`
          );
          // dispatch(
          //   setCurrentMedia({
          //     ...currentMedia,
          //   })
          // );
        }
      }}
    >
      <div
        ref={ref}
        style={{
          bottom: `${currentMedia?.logoOffset.bottom || 0}px`,
          right: `${currentMedia?.logoOffset.right || 0}px`,
        }}
        className={`absolute border `}
      >
        <ResizableBox
          width={currentMedia?.logoSize.width || 200}
          height={currentMedia?.logoSize.height || 200}
          // draggableOpts={{ grid: [25, 25] }}
          minConstraints={[40, 40]}
          maxConstraints={[500, 500]}
          onResize={() => {
            // console.log(data);
            dispatch(
              setLogoSize({
                width: ref.current?.clientWidth || 200,
                height: ref.current?.clientHeight || 200,
              })
            );
            // console.log(w, h);
            // dispatch(setLogoSize({ width: data.clientX, height: data.clientY }));
          }}
        >
          <img
            className="w-full h-full  "
            alt="rakvin logo"
            src="/RAKVIN.svg"
          />
        </ResizableBox>
      </div>
    </Draggable>
  );
}
