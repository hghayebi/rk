import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import ShowMedia from "./ShowMedia";
import Album from "./Album";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setCurrentMedia, setInSendPage } from "../store";

export default function ApprovedAlbum(): React.JSX.Element {
  const [readyToSend, setReadyToSend] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { approvedMedias } = useAppSelector((state) => state.album);
  useEffect(() => {
    dispatch(setCurrentMedia(approvedMedias[0]));
  }, [approvedMedias, dispatch]);
  return (
    <div>
      <header className="flex items-center justify-between  text-xl mb-5">
        <div
          className={`text-inherit   ${
            readyToSend ? "!text-blue-500 cursor-pointer" : "!text-gray-400"
          } hover:bg-gray-50 p-2 rounded hover:shadow`}
        >
          ارسال
          {/* <Link to={"/to-backend"}>ارسال</Link> */}
        </div>
        <div className="text-inherit">ایجاد آلبوم جدید</div>
        <Link to={"/"} onClick={() => dispatch(setInSendPage(false))}>
          <div className="cursor-pointer  hover:bg-gray-50 p-2 rounded hover:shadow">
            <BsArrowLeft className="text-2xl " />
          </div>
        </Link>
      </header>
      <div className="flex items-center justify-center gap-10 ">
        <ShowMedia />
      </div>
      <Album />
    </div>
  );
}
