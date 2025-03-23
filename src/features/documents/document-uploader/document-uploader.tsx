"use client";

import {
  CheckCircleIcon,
  CircleArrowDownIcon,
  HammerIcon,
  LoaderCircle,
  RocketIcon,
  SaveIcon,
} from "lucide-react";
import useDocumentUploader from "./use-document-uploader";

const DocumentUploader = () => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    state: { status },
  } = useDocumentUploader();

  const statusIcon = {
    UPLOADING: <RocketIcon className="h-20 w-20 text-indigo-600 animate-pulse" />,
    UPLOADED: <CheckCircleIcon className="h-20 w-20 text-indigo-600" />,
    SAVING: <SaveIcon className="h-20 w-20 text-indigo-600 animate-pulse" />,
    GENERATING: <HammerIcon className="h-20 w-20 text-indigo-600 animate-pulse" />,
  };

  const statusText = {
    UPLOADING: "Uploading file . . .",
    UPLOADED: "File uploaded successfully.",
    SAVING: "Saving file to database . . . ",
    GENERATING: "Generating AI embeddings, This will only take a few seconds . . .",
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`text-indigo-600 border-indigo-500 border-2 border-dashed flex items-center justify-center p-10 rounded-lg h-56 ${
          isDragActive ? "bg-indigo-200" : "bg-indigo-50"
        }`}
      >
        {status == "IDLE" ? (
          <div className="flex flex-col items-center gap-5 ">
            <input {...getInputProps()} />
            {isDragActive ? (
              <>
                <RocketIcon className="animate-ping" size={50} />
                <div>Drop the files here ...</div>
              </>
            ) : (
              <>
                <CircleArrowDownIcon className="animate-bounce" size={50} />
                <div>{`Drag 'n' drop some files here, or click to select files`}</div>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 ">
            <p>{statusIcon[status]}</p>
            <div className="flex items-center space-x-3">
              <LoaderCircle className="animate-spin" />
              <p>{statusText[status]}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentUploader;
