import { ClerkLoaded } from "@clerk/nextjs";
import React from "react";
import Header from "./_components/header";

interface IProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: Readonly<IProps>) => {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 p-5">{children}</main>
      </div>
    </ClerkLoaded>
  );
};

export default DashboardLayout;
