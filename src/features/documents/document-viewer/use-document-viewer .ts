"use client";

import { useEffect, useState } from "react";

interface StateType {
  numPages: number | null;
  pageNumber: number;
  file: Blob | null;
  rotation: number | null;
  scale: number;
}

const useDocumentViewer = (url: string) => {
  const [state, setState] = useState<StateType>({
    numPages: null,
    pageNumber: 1,
    file: null,
    rotation: null,
    scale: 1,
  });

  const goToPage = (pageNumber: number) => {
    if (!state.numPages || pageNumber < 1 || pageNumber > state.numPages) return;
    setState((prev) => ({ ...prev, pageNumber }));
  };

  const nextPage = () => {
    if (state.pageNumber && state.numPages && state.pageNumber < state.numPages) {
      setState((prev) => ({ ...prev, pageNumber: prev.pageNumber! + 1 }));
    }
  };

  const prevPage = () => {
    if (state.pageNumber && state.pageNumber > 1) {
      setState((prev) => ({ ...prev, pageNumber: prev.pageNumber! - 1 }));
    }
  };

  const rotate = (angle: number = 90) => {
    setState((prev) => ({
      ...prev,
      rotation: ((prev.rotation || 0) + angle) % 360,
    }));
  };

  const zoomIn = (step: number = 0.1) => {
    setState((prev) => ({ ...prev, scale: (prev.scale || 1) + step }));
  };

  const zoomOut = (step: number = 0.1) => {
    setState((prev) => ({
      ...prev,
      scale: Math.max(0.1, (prev.scale || 1) - step),
    }));
  };

  const resetView = () => {
    setState((prev) => ({ ...prev, rotation: 0, scale: 1 }));
  };

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(url);
        const file = await response.blob();
        setState((prev) => ({ ...prev, file }));
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    };

    fetchFile();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setState((prve) => ({
      ...prve,
      numPages,
    }));
  };

  return {
    ...state,
    onDocumentLoadSuccess,
    prevPage,
    nextPage,
    zoomIn,
    zoomOut,
    rotate,
    resetView,
  };
};

export default useDocumentViewer;
