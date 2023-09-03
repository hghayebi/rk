import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import UploadImage from "./UploadImage";

export default function CreateAlbum(): React.JSX.Element {
  return (
    <div className="">
      <header className="flex items-center justify-between  text-xl mb-5">
        <div className="text-inherit !text-blue-500 cursor-pointer hover:bg-gray-50 p-2 rounded hover:shadow">
          Next
        </div>
        <div className="text-inherit">ایجاد آلبوم جدید</div>
        <div className="cursor-pointer  hover:bg-gray-50 p-2 rounded hover:shadow">
          <BsArrowLeft className="text-2xl " />
        </div>
      </header>
      <div>
        <UploadImage />
      </div>
    </div>
  );
}
