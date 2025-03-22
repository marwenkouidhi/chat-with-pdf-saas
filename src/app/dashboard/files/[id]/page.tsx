import DocumentChatBox from "@/features/documents/document-chat-box/document-chat-box";
import DocumentViewer from "@/features/documents/document-viewer/document-viewer";
import { storage } from "@/lib/db/appwrite";

interface IProps {
  params: {
    id: string;
  };
}

const FilePage = async ({ params }: IProps) => {
  const { id } = await params;
  const url = storage.getFileView("67debc0f000664c5657e", id);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
      <div className="col-span-1 lg:col-span-3 bg-gray-100">
        <DocumentViewer url={url} />
      </div>

      <div className="col-span-1 lg:col-span-2 border-l-4 border-l-indigo-600">
        <DocumentChatBox />
      </div>
    </div>
  );
};

export default FilePage;
