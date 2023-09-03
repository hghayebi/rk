import React from "react";

export default function Image({ imageItem }): React.JSX.Element {
  return (
    <div className="border border-dashed p-2 rounded">
      <img width={200} src={URL.createObjectURL(imageItem.imageStr)} />
    </div>
  );
}
