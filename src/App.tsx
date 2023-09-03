import React from "react";
import CreateAlbum from "./components/CreateAlbum";
import Album from "./components/Album";

export default function App(): React.JSX.Element {
  return (
    <div className="mx-auto m-5 max-w-3xl">
      <CreateAlbum />
      <Album />
    </div>
  );
}
