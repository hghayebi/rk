import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "../hooks/hooks";
import { addImage } from "../store";
import UploadImage from "./UploadImage";

export function ImageDropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  // const [imgs, setImgs] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();

  // const files = acceptedFiles.map((file) => {
  //   // const reader = new FileReader();
  //   // reader.onabort = () => console.log("file reading was aborted");
  //   // reader.onerror = () => console.log("file reading has failed");
  //   // reader.onload = () => {
  //   //   // Do whatever you want with the file contents
  //   //   const binaryStr = reader.result;
  //   //   if (binaryStr) {
  //   //     setImgs([...imgs, binaryStr as string]);
  //   //   }
  //   // };
  //   // reader.readAsDataURL(file);
  // });

  useEffect(() => {
    dispatch(addImage(acceptedFiles));
  }, [acceptedFiles, dispatch]);
  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
        <UploadImage />
      </div>
      <aside>{/* <h4>Files</h4> */}</aside>
    </section>
  );
}
