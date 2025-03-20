import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FilePlus2Icon, FileUpIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between shadow-sm p-5 border-b">
      <Link href="/dashboard" className="text-2xl">
        Chat to <span className="text-indigo-600">PDF</span>
      </Link>
      <SignedIn>
        <div className="flex space-x-2">
          <Button asChild variant="ghost">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/documents">My Documents</Link>
          </Button>

          <Button
            asChild
            size="icon"
            variant="outline"
            className="text-indigo-600 border-indigo-600 shadow-md shadow-indigo-600/10 mr-5"
          >
            <Link href="/dashboard/upload">
              <FilePlus2Icon />
            </Link>
          </Button>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
