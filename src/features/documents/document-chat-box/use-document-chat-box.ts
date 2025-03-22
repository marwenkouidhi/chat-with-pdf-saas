"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  id: string;
  message: string;
  role: "AI" | "human" | "placeholder";
  createdAt: Date;
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const useDocumentChatBox = () => {
  const [input, setInput] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataPromise;
      setMessages(() => data);
    };
    setLoading(() => true);
    fetchData()
      .catch(console.error)
      .finally(() => setLoading(() => false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(() => true);
    setInput(() => "");
    await delay(500);
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        message: input,
        role: "human",
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        message: "Thinking . . .",
        role: "AI",
        createdAt: new Date(),
      },
    ]);

    await delay(1000);

    setMessages((prev) => [
      ...prev,

      {
        id: uuidv4(),
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta dignissim egestas. Aliquam vitae mattis ante. Fusce suscipit lacinia nibh ut tincidunt. Fusce erat neque, feugiat posuere pulvinar eget, consequat mollis tortor. Sed rhoncus, turpis sed auctor elementum, lectus dui convallis sem, id sagittis lorem neque vel elit. Fusce auctor leo mi, ut pharetra nisi molestie feugiat. Donec in est ac nunc semper euismod. Nulla consequat porttitor diam, eu rhoncus mauris imperdiet mollis. Donec a maximus dolor. Duis interdum sapien in massa aliquet fringilla. Etiam ante purus, viverra sed blandit et, hendrerit et sapien. Suspendisse sagittis elementum velit a lobortis. Pellentesque ut lobortis elit. Nulla felis ex, facilisis non nunc quis, commodo iaculis augue. Curabitur ut bibendum dui.",
        role: "AI",
        createdAt: new Date(),
      },
    ]);
    setIsPending(() => false);
  };
  return { messages, loading, input, isPending, handleSubmit, setInput, endOfMessagesRef };
};

export default useDocumentChatBox;

const dataPromise = new Promise<ChatMessage[]>((resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: "msg_001",
        message: "Hello! How can I help you today?",
        role: "AI",
        createdAt: new Date(),
      },
      {
        id: "msg_002",
        message: "I need help with my React application.",
        role: "human",
        createdAt: new Date(),
      },
      {
        id: "msg_003",
        message: "What specific issues are you facing with your React application?",
        role: "AI",
        createdAt: new Date(),
      },
      {
        id: "msg_004",
        message: "I'm having trouble with state management.",
        role: "human",
        createdAt: new Date(),
      },
      {
        id: "msg_006",
        message:
          "For state management in React, you might want to consider using React's built-in useState and useContext hooks for simpler applications, or Redux or MobX for more complex state requirements.",
        role: "AI",
        createdAt: new Date(),
      },
    ]);
  }, 500);
});
