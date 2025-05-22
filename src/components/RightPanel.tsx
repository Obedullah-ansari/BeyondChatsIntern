import React, { useState } from "react";
import { FileText, MoveUp, Ellipsis, FilePen, ChevronDown } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import DetailsPanel from "./DetailsPanel";
import { motion } from "framer-motion";
import { useContextValue } from "../store/Context";
import { useMediaQuery } from "react-responsive";
import { X } from "lucide-react";


// ⛔️ Do NOT expose this in production
const API_KEY = "AIzaSyDwXgK1Jtzkrg550HkWT0hCuXaE8AnvrWg"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

interface SourceItemProps {
  title: string;
}

const SourceItem: React.FC<SourceItemProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
        <FileText size={12} />
      </div>
      <span className="text-sm">{title}</span>
    </div>
  );
};

const AICopilotPanel = () => {
  const { handelComposerChange } = useContextValue();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userInput = message.trim();
    setMessages((prev) => [...prev, { from: "user", text: userInput }]);
    setMessage("");
    setLoading(true);

    const prompt = `
    You are Fin, an AI Copilot assistant like Intercom Fin.
    Your goal is to answer concisely in plain text, using a clear, structured, point-wise format.
    Always format responses as:
    - Bullet points (-, *, etc.) for general or unordered info
    
    Avoid long paragraphs. Keep the response under 70 words.
    
    Question: ${userInput}
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([prompt]);
      const response = result.response.text();
      setMessages((prev) => [...prev, { from: "ai", text: response }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages((prev) => [...prev, { from: "user", text: userInput }]);
    } finally {
      setLoading(false);
    }
  };

  const handelAddToComposer = () => {
    const message = messages[1].text;
    handelComposerChange(message);
  };

  return (
    <div className="p-4 flex   flex-col gap-4 h-full bg-gradient-to-b from-neutral-100 to-indigo-100">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.from === "user" ? "bg-blue-100" : "bg-gray-800"
              }`}
            >
              <span
                className={`text-xs font-medium ${
                  msg.from === "user"
                    ? "text-black"
                    : "bg-neutral-100 rounded-md  text-gray-800"
                }`}
              >
                {msg.from === "user" ? (
                  <img
                    src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
                    className="w-8 h-8 object-cover rounded-full "
                    alt=""
                  />
                ) : (
                  <img
                    src="https://cdn.prod.website-files.com/5d848f103ce9fe05b9031e19/6800d72a7d8f76df51ffe2d7_fin-logo.png"
                    className="w-8 h-8 "
                    alt=""
                  />
                )}
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              className={`text-sm p-3 rounded-lg max-w-[90%] ${
                msg.from === "user"
                  ? "bg-neutral-50"
                  : "bg-gradient-to-r from-indigo-100 to-pink-100"
              }`}
            >
              {msg.text &&
                msg.text.split(/(?<=\.)\s+/).map((line, index) => (
                  <div key={index} className="mb-1">
                    {line.trim()}
                  </div>
                ))}
              {msg.from === "ai" && (
                <div className=" bg-neutral-50 flex justify-center items-center rounded-lg">
                  <button
                    onClick={handelAddToComposer}
                    className="text-xs  cursor-pointer text-neutral-900 font-semibold w-full 
                  max-w-[90%] h-10 bg-transparent flex justify-center items-center gap-2"
                  >
                    <FilePen size={20} className="ml-4 text-neutral-900" />
                    Add to composer
                  </button>
                  <span className="block h-4 w-[0.1rem] mx-2 bg-neutral-400 rounded-full"></span>
                  <span className="mr-2">
                    <ChevronDown size={15} className="font-bold" />
                  </span>
                </div>
              )}
            </motion.div>
            {msg.from === "ai" &&
              [
                "I found this on web",
                "Another one",
                "You can check here too",
              ].map((title) => <SourceItem title={title} />)}
          </div>
        ))}

        {messages.length === 0 && !loading && (
          <div className="flex h-full w-full flex-col justify-center items-center gap-2">
            <img
              src="https://cdn.prod.website-files.com/5d848f103ce9fe05b9031e19/6800d72a7d8f76df51ffe2d7_fin-logo.png"
              className="w-8 h-8"
              alt=""
            />
            <h1 className="text-xl font-semibold">Hi, I’m Fin AI Copilot</h1>
            <p className="text-slate-400 text-[0.9rem]">
              Ask me anything about this conversation
            </p>
          </div>
        )}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center">
              <span className="text-white text-xs font-medium">F</span>
            </div>
            <div className="text-sm bg-white p-3 rounded-lg animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-1 border border-indigo-500 bg-neutral-100 rounded-full">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 rounded-full bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Ellipsis size={16} stroke="black" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            disabled={!message.trim() || loading}
            className="bg-neutral-900 p-2 mr-3 rounded-full"
          >
            <MoveUp size={16} stroke="white" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

const RightPanel: React.FC<{
  onCloseval?: boolean;
  oncloseAI?: () => void;
}> = ({ onCloseval,oncloseAI }) => {
  const [activeTab, setActiveTab] = useState<"ai" | "details">("ai");
  const isMobile = useMediaQuery({ maxWidth: 1022 });

  return (
    <motion.div
      initial={{ x: isMobile ? "200%" : "0%" }}
      animate={
        isMobile
          ? { x: onCloseval ? 0 : "200%", transition: { duration: 0.3 } }
          : { x: 0 }
      }
      className="max-sm:absolute sm:absolute right-0  lg:relative  max-sm:w-full w-[25rem]  border-l border-gray-200 bg-white flex flex-col h-full"
    >
      
      <div className="relative border-b h-[4rem] border-gray-200 flex">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "ai"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("ai")}
        >
          AI Copilot
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "details"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>

        {isMobile&&(
        <button
          onClick={oncloseAI}
          className=" absolute top-0 left-0 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      )}
      </div>

      <div className="flex-1  overflow-x-auto overflow-y-auto">
        {activeTab === "ai" ? <AICopilotPanel /> : <DetailsPanel />}
      </div>
    </motion.div>
  );
};

export default RightPanel;
