"use client";

import PageHeader from "@/components/page-header";
import DocumentsList from "@/features/documents/documents-list";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/upload");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="My Documents" />
      <div
        onClick={handleClick}
        className="hover:bg-gray-300 transition ease-in-out flex flex-col gap-2 justify-center items-center w-64 h-80 bg-gray-200 text-gray-500 drop-shadow-xl cursor-pointer rounded-2xl "
      >
        <PlusCircle size={50} />
        <p className="text-xs">Uplaod Document</p>
      </div>
      <DocumentsList />
    </div>
  );
};

export default DashboardPage;
