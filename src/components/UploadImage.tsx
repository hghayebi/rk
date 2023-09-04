import React from "react";
import { BsImage } from "react-icons/bs";

export default function UploadImage(): React.JSX.Element {
  return (
    <div className=" flex flex-col items-center justify-around mx-auto h-96">
      <div>
        <BsImage className="text-4xl text-blue-500" />
      </div>

      <div>عکس یا ویدئو خود را بکشید اینجا</div>

      <div>
        <button className="bg-blue-500 text-stone-100 px-3 py-2 rounded shadow cursor-pointer hover:bg-blue-600 active:bg-blue-500">
          از کامپیوتر خود انتخاب کنید
        </button>
        {/* <form className="flex items-center space-x-6">
          <label className="block" htmlFor="fileUpload">
            <span className="bg-blue-500 text-stone-100 px-3 py-2 rounded shadow cursor-pointer hover:bg-blue-600 active:bg-blue-500">
              از کامپیوتر خود انتخاب کنید
            </span>
            <input
              id="fileUpload"
              type="file"
              name="myImage"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleImageUpload}
            />
          </label>
        </form> */}
      </div>
    </div>
  );
}
