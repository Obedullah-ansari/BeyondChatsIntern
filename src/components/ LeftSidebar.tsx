import React from "react";
import {
  Layers2,
  ChartNoAxesColumn,
  Inbox,
  MessageSquareText,
  Zap,
  User,
  BookOpen,
  Grip,
  Send,
  Menu,
} from "lucide-react";

interface LeftSidebarProps {
  onCloseval?: boolean;
  onClose?: () => void;
  onCloseAI?:()=>void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onClose ,onCloseAI}) => {
  return (
    <div className="w-[60px] bg-neutral-200 border-r border-gray-200 h-full flex flex-col items-center py-4">
      <div className="mb-6 ">
        <div className="w-6 h-6  max-sm:hidden sm:hidden md:block rounded-md flex items-center justify-center">
          <img
            src="https://cdn.prod.website-files.com/5d848f103ce9fe05b9031e19/6800d72a7d8f76df51ffe2d7_fin-logo.png"
            alt=""
            className="w-full h-full"
          />
        </div>

        {
          <div className="md:hidden rounded-md flex items-center justify-center">
            <button className="w-6 h-6" onClick={onClose}>
              <Menu size={18} />
            </button>
          </div>
        }
      </div>

      {
        <div 
        onClick={onCloseAI}
        className="w-6 h-6 md:block lg:hidden  m-3 rounded-md flex items-center justify-center">
          <img
            src="https://cdn.prod.website-files.com/5d848f103ce9fe05b9031e19/6800d72a7d8f76df51ffe2d7_fin-logo.png"
            alt=""
            className="w-full h-full"
          />
        </div>
      }

      <div className="relative mb-4">
        <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center nav-icon">
          <Inbox size={18} className="text-indigo-500" />
        </div>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          1
        </span>
      </div>

      <Send size={18} className="m-3" stroke="#e5e5e5 " fill="black" />

      <div className="flex flex-col gap-5 items-center justify-end h-full  flex-1">
        <Zap size={24} stroke="#e5e5e5 " fill="black" />
        <Layers2 size={18} />
        <ChartNoAxesColumn size={18} />
        <User size={18} stroke="#e5e5e5 " fill="black" />
        <MessageSquareText
          size={18}
          stroke="#e5e5e5 "
          fill="black"
          className="text-black"
        />
        <BookOpen size={18} stroke="#e5e5e5" fill="black" />
        <Grip size={18} />
      </div>

      <div className="m-6 w-8 h-8">
        <img
          src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
          alt=""
          className="w-full h-full rounded-full  object-cover"
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
