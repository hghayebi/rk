import React from "react";
import { BsImage } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addImage } from "../store/slices/albumSlice";

export default function UploadImage(): React.JSX.Element {
  const dispatch = useDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0 || event.target.files === null) return;
    const r: FileList = event.target.files;

    dispatch(addImage([...r]));
  };
  return (
    <div>
      <div className="border rounded shadow flex flex-col items-center gap-20 p-10 max-w-sm mx-auto">
        <div>
          <BsImage className="text-4xl text-blue-500" />
        </div>
        <div className="flex items-center justify-between w-full">
          <IoIosArrowForward className="text-4xl" />
          <div>عکس یا ویدئو خود را بکشید اینجا</div>
          <IoIosArrowBack className="text-4xl" />
        </div>
        <div>
          <form className="flex items-center space-x-6">
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
          </form>
        </div>
      </div>
    </div>
  );
}
