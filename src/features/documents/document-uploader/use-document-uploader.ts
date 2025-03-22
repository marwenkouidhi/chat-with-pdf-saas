"use client";

import { db, ID, storage } from "@/lib/db/appwrite";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

export type STATUS = "IDLE" | "UPLOADING" | "UPLOADED" | "SAVING" | "GENERATING";

interface stateType {
  fileId: string | null;
  status: STATUS;
}

const useDocumentUploader = () => {
  const router = useRouter();
  const user = useUser();
  const [state, setState] = useState<stateType>({
    fileId: null,
    status: "IDLE",
  });

  const uploadFile = async (file: File) => {
    if (!file || !user || !user.user) return;

    const fileId = uuidv4();
    const userId = user.user.id;

    setState({
      fileId: null,
      status: "UPLOADING",
    });

    try {
      const createFileResponse = await storage.createFile(
        "67debc0f000664c5657e",
        fileId,
        file,
        [],
        (progress) => {
          console.log(progress);
          setState((prev) => ({
            ...prev,
            progress: progress.progress,
          }));
        }
      );

      setState((prev) => ({
        ...prev,
        fileId: createFileResponse.$id,
        status: "UPLOADED",
      }));

      setState((prev) => ({
        ...prev,
        status: "SAVING",
      }));

      const createDocumentResponse = await db.createDocument(
        "67dc9b85001d13d6d920",
        "67dc9b980022e0e18139",
        ID.unique(),
        {
          userId,
          fileId,
        }
      );
    } catch (error) {
      setState({
        fileId: null,
        status: "IDLE",
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  useEffect(() => {
    if (state.fileId) {
      router.push(`/dashboard/files/${state.fileId}`);
    }
  }, [state.fileId, router]);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    state,
  };
};

export default useDocumentUploader;
