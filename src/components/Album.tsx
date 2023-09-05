import { useAppSelector } from "../hooks/hooks";
import Media from "./Media";
export default function Album() {
  const { approvedMedias } = useAppSelector((state) => state.album);
  const renderedMedias = approvedMedias.map((media) => {
    if (!media) return;
    if (!media.isApproved) return;

    return <Media key={media.id} mediaItem={media} />;
  });
  return (
    <div className="overflow-x-scroll flex items-center gap-3 mt-10 py-5">
      {renderedMedias}
    </div>
  );
}
