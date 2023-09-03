import React from "react";
import { BsImage } from "react-icons/bs";
import { addImage } from "../store/slices/albumSlice";
import { useAppDispatch } from "../hooks/hooks";

export default function UploadImage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0 || event.target.files === null) return;
    const r: FileList = event.target.files;

    dispatch(addImage([...r]));
  };

  return (
    <div className=" flex flex-col items-center gap-20  min-w-fit  mx-auto h-96">
      <div>
        <BsImage className="text-4xl text-blue-500" />
      </div>
      <div className="flex items-center justify-between w-full">
        {/* <IoIosArrowForward className="text-4xl" /> */}
        <div>عکس یا ویدئو خود را بکشید اینجا</div>
        {/* <IoIosArrowBack className="text-4xl" /> */}
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
  );
}
