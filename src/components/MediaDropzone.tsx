import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "../hooks/hooks";
import { addMedia } from "../store";
import UploadMedia from "./UploadMedia";

export function MediaDropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  // const [imgs, setImgs] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (acceptedFiles[0]) {
      dispatch(addMedia(acceptedFiles[0]));
    }
  }, [acceptedFiles, dispatch]);
  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />

        <UploadMedia />
      </div>
    </section>
  );
}
