import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  useContextValue } from "../store/Context";
import {
  Zap,
  BookmarkMinus,
  Smile,
  BookOpen,
  Star,
  MoreHorizontal,
  FileText,
  Phone,
  Moon,
  ArrowDownWideNarrow,
  MessageSquareText,
  ChevronDown,
} from "lucide-react";
import Message from "./Message";


interface ChatMessage {
  sender: "user" | "bot";
  content: string | "";
  timestamp?: string;
}

const ChatView = () => {
  const { composer } = useContextValue();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    setMessage("");
    setTimeout(() => autoResize(), 0);
    e.preventDefault();
    if (message.trim()) {
      const newMessage: ChatMessage = {
        sender: "bot",
        content: message.trim(),
      };
      setChatHistory((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    autoResize();
  };

  useEffect(() => {
    if (composer) {
      setMessage(composer);
      autoResize();
    }
  }, [composer]);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 192;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div
      className="relative flex-1 flex justify-center items-center flex-col h-full"
    >
      {/* Header */}
      <div className="border-b border-gray-300 h-[4rem] w-full p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-bold">Ruby</h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {/* Buttons */}
          <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hidden md:flex">
            <Star size={16} />
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hidden md:flex">
            <MoreHorizontal size={16} />
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hidden md:flex">
            <FileText stroke="#f3f4f6" fill="black" size={16} />
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hidden sm:flex">
            <Phone stroke="#f3f4f6" fill="black" size={16} /> Call
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hidden sm:flex">
            <Moon stroke="#f3f4f6" fill="black" size={16} /> Snooze
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all bg-black text-white hover:bg-gray-800">
            <ArrowDownWideNarrow size={16} /> Close
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pb-[12rem] p-4 bg-white w-full">
        {/* Initial Static Messages */}
        <Message
          sender="user"
          content="Hey there, sorry can't figure this out, but how do I transfer money to another example bank account?"
          timestamp="15d"
        />
        <Message
          sender="bot"
          content={
            <div>
              <p className="mb-2">
                To easily transfer money to another Example Bank account, we
                have provided simple steps for you to follow:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  First, log into your Example Bank Portal using the link
                  provided.
                </li>
                <li>Then, navigate to the "My Account" section.</li>
                <li>Click on "Bank Transfer" to begin the process.</li>
                <li>Next, select the recipient of your transfer.</li>
                <li>Enter the amount you wish to transfer.</li>
                <li>Finally, confirm the transfer by clicking 'Transfer'.</li>
              </ol>
              <p className="mt-2">
                If the recipient is not already in your friend list, don't
                worry! You can easily add them:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Click on the '+ New' button located in the top right corner.
                </li>
                <li>
                  Fill in the required contact details including country codes.
                </li>
                <li>Tap 'Add' to complete the process.</li>
              </ol>
              <p className="mt-2">
                Alternatively, you can use the recipient's ExTag in the search
                bar or scan their QR code.
              </p>
            </div>
          }
          timestamp="Seen · 15d"
          avatar="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
        />
        <Message
          sender="user"
          content="How do you change the date of a stay?"
        />

        {/* Dynamic Messages */}

        {chatHistory.map((msg, idx) => (
          <motion.div
          ref={chatEndRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          >
            <Message
              key={idx}
              sender={msg.sender}
              content={msg.content}
              timestamp={msg.timestamp}
              avatar="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
            />
          </motion.div>
        ))}
      </div>

      {/* Input Box */}
      <div className="absolute bottom-3 w-[90%] shadow-lg m-4 bg-neutral-50 rounded-lg p-2">
        <div className="flex gap-2 px-1 items-center text-[0.9rem] font-medium">
          <MessageSquareText size={18} fill="black" stroke="white" />
          <span>Reply</span>
          <ChevronDown size={15} className="font-bold" />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            ref={textareaRef}
            className="flex-1 text-sm p-2 rounded-md focus:outline-none resize-none overflow-y-auto max-h-[12rem]"
            placeholder="Use ⌘K for shortcuts"
            value={message}
            onChange={handleInputChange}
          />
        </form>
        <div className="flex text-[0.9rem] justify-end items-center p-3">
          <div className="w-full flex justify-start items-center gap-3">
            <Zap size={20} fill="black" stroke="white" />
            <span className="block h-4 w-[0.02rem] bg-neutral-400 rounded-full"></span>
            <BookmarkMinus size={20} fill="black" stroke="white" />
            <Smile size={20} fill="black" stroke="white" />
            <BookOpen size={20} fill="black" stroke="white" />
            <div className="w-4 h-3 rounded-[0.1rem] text-center bg-neutral-950 text-neutral-50 font-bold text-[0.5rem]">
              AI
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="font-normal rounded-md disabled:opacity-50"
            disabled={!message.trim()}
          >
            Send
          </button>
          <span className="block h-4 w-[0.02rem] mx-2 bg-neutral-400 rounded-full"></span>
          <ChevronDown size={15} className="font-bold" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
