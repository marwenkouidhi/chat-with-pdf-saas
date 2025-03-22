"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import useDocumentChatBox from "./use-document-chat-box";
import DocumentChatMessage from "./document-chat-message";
import { v4 as uuidv4 } from "uuid";

const DocumentChatBox = () => {
  const { input, isPending, loading, messages, handleSubmit, setInput, endOfMessagesRef } =
    useDocumentChatBox();
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {loading ? (
          <div className="flex justify-center pt-24">
            <LoaderCircleIcon className="animate-spin h-16 w-16 text-indigo-600" />
          </div>
        ) : (
          <div className=" p-5">
            {messages.length == 0 && (
              <DocumentChatMessage
                data={{
                  id: uuidv4(),
                  message: "Ask me anything about the document",
                  role: "placeholder",
                  createdAt: new Date(),
                }}
              />
            )}
            {messages.map((message, _) => (
              <DocumentChatMessage key={_} data={message} />
            ))}
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 flex justify-between items-center space-x-3 p-5 bg-indigo-500 "
      >
        <Input
          placeholder="Ask a question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-100"
        />
        <Button type="submit" className="cursor-pointer" disabled={!input || isPending}>
          {isPending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <div className="flex space-x-2 items-center">
              <SendIcon />
              <p>Ask</p>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DocumentChatBox;
