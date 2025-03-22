"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import useDocumentViewer from "./use-document-viewer ";
import { Page, Document, pdfjs } from "react-pdf";
import { LoaderCircleIcon, RefreshCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface IProps {
  url: string;
}

const DocumentViewer = ({ url }: IProps) => {
  const {
    file,
    numPages,
    pageNumber,
    rotation,
    scale,
    onDocumentLoadSuccess,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    rotate,
    resetView,
  } = useDocumentViewer(url);

  return (
    <div className="text-xs space-y-5">
      <div className="max-w-4xl mx-auto p-3 sticky top-0 z-50 bg-gray-100 rounded-b-md shadow-sm flex justify-center space-x-5 md:space-x-10">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={pageNumber === 1}
            onClick={prevPage}
          >
            Previous
          </Button>
          <p>
            {pageNumber} of {numPages}
          </p>
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={pageNumber === numPages}
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="icon"
          disabled={scale >= 2}
          onClick={() => rotate()}
        >
          <RefreshCcwIcon />
        </Button>
        <div className="flex space-x-3">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            disabled={scale >= 2}
            onClick={() => zoomIn()}
          >
            <ZoomInIcon />
          </Button>

          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            disabled={scale <= 0.5}
            onClick={() => zoomOut()}
          >
            <ZoomOutIcon />
          </Button>
        </div>

        <Button className="cursor-pointer" variant="outline" onClick={resetView}>
          Reset
        </Button>
      </div>

      {/* PDF VIEWER */}
      <div className="max-w-3xl mx-auto overflow-auto">
        {!file ? (
          <LoaderCircleIcon className="animate-spin h-16 w-16 text-indigo-600" />
        ) : (
          <Document
            loading={null}
            file={file}
            rotate={rotation}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page scale={scale} pageNumber={pageNumber} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
