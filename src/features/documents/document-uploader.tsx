"use client";

import { CircleArrowDownIcon, RocketIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DocumentUploader = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.table(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="">
      <div
        {...getRootProps()}
        className={`text-indigo-600 border-indigo-500 border-2 border-dashed flex items-center justify-center p-10 rounded-lg h-56 ${
          isDragActive ? "bg-indigo-200" : "bg-indigo-50"
        }`}
      >
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
      </div>
    </div>
  );
};

export default DocumentUploader;
