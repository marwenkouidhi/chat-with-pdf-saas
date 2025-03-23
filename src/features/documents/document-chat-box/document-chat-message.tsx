"use client";

import { useUser } from "@clerk/nextjs";
import { ChatMessage } from "./use-document-chat-box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BotIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  data: ChatMessage;
}

const DocumentChatMessage = ({ data }: IProps) => {
  const { message, role } = data;
  const isHuman = role === "human";
  const { user } = useUser();
  return (
    <div
      className={cn(
        "text-white text-sm flex w-full gap-3 p-4",
        isHuman ? "justify-end" : "justify-start"
      )}
    >
      {!isHuman && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo-600 ">
              <BotIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div
        className={cn(
          "rounded-2xl px-4 py-2 whitespace-pre-wrap break-words",
          isHuman ? "bg-indigo-600 rounded-tr-none" : "bg-gray-600 rounded-tl-none"
        )}
      >
        {message}
      </div>

      {isHuman && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.fullName}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default DocumentChatMessage;
