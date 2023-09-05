import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import Image from "../Media";
import { MediaType } from "../../store";

export function Card({
  itemId,
  selected,
  onClick,
  title,
  mediaItem,
}: {
  itemId: string;
  selected: boolean;
  onClick: Function;
  title: string;
  mediaItem: MediaType;
}) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (
    <div
      onClick={() => onClick(visibility)} // NOTE: for center items
      role="button"
      // style={{
      //   border: "1px solid",
      //   display: "inline-block",
      //   margin: "0 10px",
      //   width: "160px",
      //   userSelect: "none",
      // }}
      tabIndex={0}
      className="card border my-0 mx-3 w-40 h-32"
    >
      {/* <div>
        <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(visible)}
        </div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div> */}
      {/* <div
        style={{
          backgroundColor: selected ? "green" : "bisque",
          height: "200px",
        }}
      /> */}
      <Image mediaItem={mediaItem} />
    </div>
  );
}
