import React from "react";
import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./card";
import useDrag from "./useDrag";
import {
  ScrollMenu,
  VisibilityContext,
  getItemsPos,
  slidingWindow,
} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { useAppSelector } from "../../hooks/hooks";

// NOTE: embrace power of CSS flexbox!
// import "./hideScrollbar.css";
// import "./firstItemMargin.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function HorizantalScroll() {
  // -------------ho----------
  const { medias: items } = useAppSelector((state) => state.album);
  // -------------ho----------

  // const [items] = React.useState(medias);
  console.log(items);

  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState<string>("");
  const handleItemClick =
    (itemId: string) =>
    ({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
      if (dragging) {
        return false;
      }
      setSelected(selected !== itemId ? itemId : "");
      // NOTE: for center items
      scrollToItem(getItemById(itemId), "smooth", "center", "nearest");
    };

  return (
    <>
      <div className="example" style={{ paddingTop: "100px" }}>
        <div onMouseLeave={dragStop}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
            onMouseDown={() => dragStart}
            onMouseUp={({
                getItemById,
                scrollToItem,
                visibleItems,
              }: scrollVisibilityApiType) =>
              () => {
                // NOTE: for center items
                dragStop();
                const { center } = getItemsPos(visibleItems);
                scrollToItem(getItemById(center), "smooth", "center");
              }}
            options={{ throttle: 0 }} // NOTE: for center items
            onMouseMove={handleDrag}
          >
            {items.map((mediaItem) => (
              <Card
                title={mediaItem.id}
                itemId={mediaItem.id}
                key={mediaItem.id}
                onClick={handleItemClick(mediaItem.id)}
                selected={mediaItem.id === selected}
                mediaItem={mediaItem}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default HorizantalScroll;

function onWheel(
  { getItemById, items, visibleItems, scrollToItem }: scrollVisibilityApiType,
  ev: React.WheelEvent
): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    // NOTE: for center items
    const nextGroupItems = slidingWindow(
      items.toItemsKeys(),
      visibleItems
    ).next();
    const { center } = getItemsPos(nextGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  } else if (ev.deltaY > 0) {
    const prevGroupItems = slidingWindow(
      items.toItemsKeys(),
      visibleItems
    ).prev();
    const { center } = getItemsPos(prevGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  }
}
