import LeftSidebar from "./components/ LeftSidebar"
import ConversationList from "./components/ ConversationList"
import ChatView from "./components/ChatView"
import RightPanel from "./components/RightPanel"
import { useState } from "react";

function App() {
 
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAI, setIsOpenAI] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev)=> !prev);
  };

  const handleClose = () => {
    setIsOpenAI((prev)=> !prev);
  }

  return (
    <>
     <div className="relative h-screen flex overflow-hidden">
      <LeftSidebar
         onCloseval={isOpen}
         onClose={handleToggle}
         onCloseAI={handleClose}
      />
      <ConversationList 
      onCloseval={isOpen}
      onClose={handleToggle}
      />

      <ChatView  />
      <RightPanel 
      oncloseAI={handleClose}
      onCloseval={isOpenAI}
      />
  
    </div>
    </>
  )
}

export default App
