import { useAppSelector } from "../hooks/hooks";
import Image from "./Image";
export default function Album() {
  const { images } = useAppSelector((state) => state.album);
  const renderedImages = images.map((image) => {
    if (!image) return;
    return <Image key={image.id} imageItem={image} />;
  });
  return (
    <div className="overflow-x-scroll flex items-center gap-3 mt-10">
      {renderedImages}
    </div>
  );
}
