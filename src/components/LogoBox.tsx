import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { setLogoSize } from "../store";

export default function LogoBox(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentMedia } = useAppSelector((state) => state.album);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={
        {
          // bottom: currentMedia?.logoOffset.bottom,
          // right: currentMedia?.logoOffset.right,
        }
      }
      className={`absolute  border bottom-2 right-2   `}
    >
      <ResizableBox
        width={currentMedia?.logoSize.width || 200}
        height={currentMedia?.logoSize.height || 200}
        // draggableOpts={{ grid: [25, 25] }}
        minConstraints={[100, 100]}
        maxConstraints={[35 * 10, 35 * 10]}
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
        <img className="w-full h-full  " alt="re" src="/RAKVIN.svg" />
      </ResizableBox>
    </div>
  );
}
