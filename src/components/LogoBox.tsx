import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { setCurrentMedia, setLogoOffset, setLogoSize } from "../store";
import Draggable from "react-draggable";

export default function LogoBox(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentMedia } = useAppSelector((state) => state.album);

  const ref = useRef<HTMLDivElement>(null);
  let b = 0;
  let r = 0;
  b = currentMedia?.logoOffset?.bottom;

  r = currentMedia?.logoOffset?.right;

  useEffect(() => {
    console.log("b: " + b);
    console.log("r: " + r);
  });

  return (
    <Draggable
      onStop={(e) => {
        console.log(e);
        // console.log(ref.current?.getClientRects());
        console.log(ref.current?.getBoundingClientRect());

        dispatch(
          setLogoOffset(ref.current?.getBoundingClientRect() as DOMRect)
        );
        dispatch(setCurrentMedia(currentMedia));
      }}
    >
      <div
        ref={ref}
        style={{
          bottom: `${-b || 0}px`,
          right: `${-r || 0}px`,
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
