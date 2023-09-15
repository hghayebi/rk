import React from "react";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setPrice, setSalesMethod } from "../store";

export default function AlbumForm(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { currentMedia } = useAppSelector((state) => state.album);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPrice(parseFloat(event.target.value) || null));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border border-dashed border-3 p-4 rounded min-w-fit shadow-md"
    >
      <div className="flex flex-col gap-2 p-2 border-b border-dashed mb-6">
        <label className="mb-4">نحوه فروش :</label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <label id="exclusive">اختصاصی</label>
            <input
              onChange={(e) =>
                dispatch(
                  setSalesMethod(e.target.checkValidity() ? "exclusive" : null)
                )
              }
              name="salesMethod"
              id="exclusive"
              type="radio"
              value="exclusive"
              checked={currentMedia?.salesMethod === "exclusive"}
            />
          </div>
          <div className="flex items-center gap-1">
            <label id="shared">اشتراکی</label>
            <input
              onChange={(e) =>
                dispatch(
                  setSalesMethod(e.target.checkValidity() ? "shared" : null)
                )
              }
              name="salesMethod"
              id="shared"
              type="radio"
              value="shared"
              checked={currentMedia?.salesMethod === "shared"}
            />
          </div>
        </div>
      </div>
      {/* ------------------------------------------ */}
      {/* ------------------------------------------ */}
      <div className="flex flex-col gap-2 p-2 border-b border-dashed mb-6">
        <label className="mb-4" id="price">
          قیمت:
        </label>
        <div>
          <input
            onChange={handlePriceChange}
            value={currentMedia?.price || ""}
            className="border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-blue-200"
            id="price"
            type="number"
            placeholder="قیمت"
          />
        </div>
      </div>

      <button className="px-4 py-2 border bg-blue-500 text-gray-100 rounded shadow max-w-fit hover:bg-blue-600 active:bg-blue-500">
        افزودن مجری
      </button>
    </form>
  );
}
