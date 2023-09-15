import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import ShowMedia from "./ShowMedia";
import ChangeAspectRatioMenu from "./ChangeAspectRatioMenu";

import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { setInSendPage } from "../store";

export default function CreateAlbum(): React.JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="">
      <header className="flex items-center justify-between  text-xl mb-5">
        <Link to={"/send-album"} onClick={() => dispatch(setInSendPage(true))}>
          <div className="text-inherit !text-blue-500 cursor-pointer hover:bg-gray-50 p-2 rounded hover:shadow">
            Next
          </div>
        </Link>

        <div className="text-inherit">ایجاد آلبوم جدید</div>
        <div className="cursor-pointer  hover:bg-gray-50 p-2 rounded hover:shadow">
          <BsArrowLeft className="text-2xl " />
        </div>
      </header>
      <div className="flex items-center justify-start gap-10 ">
        <ChangeAspectRatioMenu />

        <div className="w-full flex justify-center">
          <ShowMedia />
        </div>
      </div>
    </div>
  );
}
