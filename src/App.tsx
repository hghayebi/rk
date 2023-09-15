import React from "react";
import CreateAlbum from "./components/CreateAlbum";
import Album from "./components/Album";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApprovedAlbum from "./components/ApprovedAlbum";

export default function App(): React.JSX.Element {
  return (
    <div className="mx-auto m-5 max-w-7xl">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <CreateAlbum />
                <Album />
              </React.Fragment>
            }
          />
          <Route path="/send-album" element={<ApprovedAlbum />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
