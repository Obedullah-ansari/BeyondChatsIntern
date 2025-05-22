interface MessageProps {
    content: string | React.ReactNode;
    sender: "user" | "bot";
    timestamp?: string;
    avatar?: string;
  }
  
  const Message: React.FC<MessageProps> = ({
    content,
    sender,
    timestamp,
    avatar,
  }) => {
    return (
      <div
        className={`flex gap-3  ${
          sender === "user" ? "justify-start" : "justify-end"
        } mb-4`}
      >
        {sender !== "user" && (
          <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full rounded-full"
              />
            ) : (
              <div className="text-xs font-medium">R</div>
            )}
          </div>
        )}
  
        <div
          className={`rounded-lg text-[0.9rem]  p-4 my-2 max-w-[80%] ${
            sender === "user"
              ? "bg-neutral-100 self-end"
              : "bg-indigo-100 self-start"
          }`}
        >
          {content}
          {timestamp && (
            <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
          )}
        </div>
  
        {sender === "user" && (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-xs font-medium">Y</div>
            )}
          </div>
        )}
      </div>
    );
  };
  export default Message;  