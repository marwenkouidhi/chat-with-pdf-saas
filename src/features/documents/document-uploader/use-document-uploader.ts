"use client";

import { db, ID, storage } from "@/lib/db/appwrite";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadFile = async (file: File) => {
        if (!file || !user || !user.user) return;

        const userId = user.user.id;

        setState({
          fileId: null,
          status: "UPLOADING",
        });

        try {
          const createFileResponse = await storage.createFile(
            "67debc0f000664c5657e",
            ID.unique(),
            file,
            []
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

          await db.createDocument("67dc9b85001d13d6d920", "67dc9b980022e0e18139", ID.unique(), {
            userId,
            fileId: createFileResponse.$id,
          });
        } catch {
          setState({
            fileId: null,
            status: "IDLE",
          });
        }
      };

      uploadFile(acceptedFiles[0]);
    },
    [user]
  );

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
