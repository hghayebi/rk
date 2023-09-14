import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { setLogoOffset, setLogoSize } from "../store";
import Draggable from "react-draggable";

export default function LogoBox(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentMedia } = useAppSelector((state) => state.album);
  const { currentRatio } = useAppSelector((state) => state.ratio);
  const ratio = currentRatio?.label;
  const size = currentMedia?.sizeValue;
  const id = currentMedia?.id;
  // const [cl, setCl] = useState(
  //   `bottom-[${(currentMedia?.logoOffset.bottom || 0) * 0.0625}rem] right-[${
  //     (currentMedia?.logoOffset.right || 0) * 0.0625
  //   }rem]`
  // );
  const [bottom, setBottom] = useState(currentMedia?.logoOffset.bottom);
  const [right, setRight] = useState(currentMedia?.logoOffset.right);

  const ref = useRef<HTMLDivElement>(null);

  // b = currentMedia?.logoOffset?.bottom;

  // r = currentMedia?.logoOffset?.right;

  // useEffect(() => {
  //   setBottom(currentMedia?.logoOffset?.bottom);
  //   setRight(currentMedia?.logoOffset?.right);
  //   console.log("b: " + bottom);
  //   console.log("r: " + right);
  // }, [currentMedia, bottom, right]);
  // console.log(`bottom: ${bottom}`);
  // console.log(`right: ${right}`);

  useEffect(() => {
    setBottom(currentMedia?.logoOffset.bottom);
    setRight(currentMedia?.logoOffset.right);
  }, [id, size, ratio]);

  // if (currentMedia) {
  //   console.log(
  //     `currentmedia: logoOffset:b: ${currentMedia.logoOffset.bottom} r: ${currentMedia.logoOffset.right}`
  //   );
  // }
  return (
    <Draggable
      // defaultClassName={`  absolute bottom-0 right-0 `}
      bounds={`parent`}
      onStop={() => {
        // setTimeout(() => {
        dispatch(
          setLogoOffset(ref.current?.getBoundingClientRect() as DOMRect)
        );
        // }, 1000);

        if (currentMedia) {
          console.log(
            `currentmedia: logoOffset:b: ${currentMedia.logoOffset.bottom} r: ${currentMedia.logoOffset.right}`
          );
          // setBottom(() => currentMedia?.logoOffset.bottom);
          // setRight(() => currentMedia?.logoOffset.right);
        }
      }}
    >
      <div
        ref={ref}
        style={{
          // bottom: `${currentMedia?.logoOffset.bottom || 0}px`,
          // right: `${currentMedia?.logoOffset.right || 0}px`,
          bottom: `${bottom || 0}px`,
          right: `${right || 0}px`,
        }}
        className={`absolute  hover:cursor-pointer`}
      >
        <ResizableBox
          className="box"
          resizeHandles={["sw", "se", "nw", "ne", "w", "e", "n", "s"]}
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
          <img className="w-full h-full " alt="rakvin logo" src="/RAKVIN.svg" />
        </ResizableBox>
      </div>
    </Draggable>
  );
}
