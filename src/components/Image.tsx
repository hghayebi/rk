import React from "react";
import { ImageType } from "../store";

export default function Image({
  imageItem,
}: {
  imageItem: ImageType;
}): React.JSX.Element {
  return (
    <div className="border border-dashed p-2 rounded">
      <img width={200} src={URL.createObjectURL(imageItem.imageFile)} />
    </div>
  );
}
