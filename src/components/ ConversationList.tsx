import React from "react";
import { ChevronDown, X, Book } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
interface ConversationProps {
  title: string;
  question: string;
  time: string;
  isActive?: boolean;
}

interface ConversationListProps {
  onCloseval?: boolean;
  onClose?: () => void;
}

const Conversation: React.FC<ConversationProps> = ({
  title,
  question,
  time,
  isActive = false,
}) => {
  return (
    <div
      className={`p-3 rounded-lg flex gap-3 cursor-pointer hover:bg-gray-100 transition-colors ${
        isActive ? "bg-indigo-100" : ""
      }`}
    >
      <div className="w-8 h-8 bg-indigo-300 rounded-full flex items-center justify-center text-white font-medium">
        {title.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm">{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5 truncate">{question}</p>
      </div>
    </div>
  );
};

const ConversationList: React.FC<ConversationListProps> = ({
  onClose,
  onCloseval,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <motion.div
      initial={{ x: isMobile ? "-100%" : "0%" }}
      animate={
        isMobile
          ? { x: onCloseval ? 0 : "-100%", transition: { duration: 0.3 } }
          : { x: 0 }
      }
      className={`
      fixed top-0 left-0 h-full z-50 bg-white border-r border-neutral-300
      w-auto max-sm:w-full
      md:relative md:translate-x-0 md:flex md:flex-col
    `}
    >
      {onCloseval && (
        <button
          onClick={onClose}
          className="md:hidden absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      )}

      <div className="border-b border-neutral-300 h-[4rem] p-2">
        <div className="flex items-center h-full w-full  px-2">
          <Book size={18} className="text-neutral-800  rotate-90" />
          <div className="flex items-center px-2">
            <h2 className="font-bold">Brian Byrne</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-700 flex font-semibold items-center gap-1">
              1 Open
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-sm text-gray-700 flex font-semibold items-center gap-1">
              Newest
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <Conversation
          title="Ruby - Example"
          question="Question: The customer flagged a tran..."
          time="7d"
          isActive={true}
        />
        <Conversation
          title="Support Ticket"
          question="How do I change my subscription plan?"
          time="2d"
        />
        <Conversation
          title="Customer Query"
          question="Where can I find my invoice history?"
          time="4h"
        />
      </div>
    </motion.div>
  );
};

export default ConversationList;
