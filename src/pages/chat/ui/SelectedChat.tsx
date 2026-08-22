
import { IoIosSearch } from "react-icons/io";
import { BsPinAngle, BsThreeDots } from "react-icons/bs";
import { LuPaperclip } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { Input, Spinner } from "@shared/ui";
import { socket } from "@shared/services";
import { useEffect, useRef, useState } from "react";
import { $userHooks } from "@entities/user/api";
import { useAuthStore } from "@shared/models";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { useParams } from "react-router-dom";

export function SelectedChat() {
  const chatId = useParams()?.chatId || ""
  const user = useAuthStore((state) => state.user);
  const { data: chatData, isLoading: isChatLoading } =
    $userHooks.getChat(chatId);

  const [messageInp, setMessageInp] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "instant",
      });
    }
  }

  useEffect(() => {
    if (!isChatLoading) scrollToBottom();
  }, [isChatLoading]);

  socket.on("typing:start", ({ userId, chatId }) => {
    if (chatData?.chatId === chatId && userId != user?.id) {
      setIsTyping(true);
    }
  });
  socket.on("typing:end", ({ userId, chatId }) => {
    if (chatData?.chatId === chatId && userId != user?.id) {
      setIsTyping(false);
    }
  });

  const typing = !!messageInp.length;

  useEffect(() => {
    if (typing) {
      socket.emit("typing:start", {
        companionId: chatData?.companion.id,
        chatId: chatData?.chatId,
      });
    } else {
      socket.emit("typing:end", {
        companionId: chatData?.companion.id,
        chatId: chatData?.chatId,
      });
    }
  }, [typing, chatData]);

  if (isChatLoading) {
    return <Spinner />;
  }
  if (!chatData) {
    return "Chat";
  }

  return (
    <div className="grow flex flex-col">
      <div className="shrink-0 flex justify-between items-center w-full px-5 py-3 bg-surface border-b border-default">
        <div className="flex gap-2 items-center">
          <div
            className={`flex items-center justify-center w-11 h-11 rounded-full text-accent bg-accent/20`}
          ></div>
          <div className="">{chatData.chatName}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-elevated border border-default rounded-lg text-secondary cursor-pointer transition-colors duration-300 hover:bg-surface">
            <IoIosSearch size={20} />
          </div>
          <div className="p-2 bg-elevated border border-default rounded-lg text-secondary cursor-pointer transition-colors duration-300 hover:bg-surface">
            <BsPinAngle size={20} />
          </div>
          <div className="p-2 bg-elevated border border-default rounded-lg text-secondary cursor-pointer transition-colors duration-300 hover:bg-surface">
            <BsThreeDots size={20} />
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6 w-full grow overflow-auto">
        {chatData.messages.map((item) => {
          // const initials = getInitials(item.author.name, item.author.surname);
          const isMine = item.author.id === user?.id;
          return (
            <div
              className={`flex gap-2 ${isMine ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-full ${isMine ? "text-accent bg-accent/20" : "text-success bg-success/20"}`}
              >
                {/* {initials} */}
              </div>
              <div className="">
                <div
                  className={`p-2 max-w-80 rounded-xl w-max h-max
                ${isMine ? "bg-accent/35 rounded-br-sm" : "bg-secondary/35 rounded-bl-sm"}`}
                >
                  {item.message}
                </div>
                <div
                  className={`flex items-center gap-1 mt-1 text-sm text-muted ${isMine && "justify-end"}`}
                >
                  {/* <span>{item.messageTime}</span> */}
                  {isMine && (
                    <div
                      className={`${item.status === "read" ? "text-success" : "text-muted"}`}
                    >
                      {item.status === "sent" ? (
                        <IoCheckmark />
                      ) : (
                        <IoCheckmarkDone />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className={`flex gap-2`}>
            <div className="">
              <div
                className={`p-2 max-w-80 rounded-xl w-max h-max bg-secondary/35 rounded-bl-sm`}
              >
                Typing...
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
      <div className="shrink-0 w-full px-4 py-2 bg-surface">
        <div className="flex items-center gap-2 px-4 py-2 border border-default rounded-lg bg-elevated">
          <div className="w-max cursor-pointer text-secondary transition-colors duration-300 hover:text-primary">
            <LuPaperclip size={20} />
          </div>
          <div className="w-max cursor-pointer text-secondary transition-colors duration-300 hover:text-primary">
            <FaRegSmile size={20} />
          </div>
          <Input
            value={messageInp}
            onChange={setMessageInp}
            className="grow"
            placeholder="Message..."
          />
          <button
            onClick={() => {
              setIsLoading(true);
              socket.emit(
                "message:send",
                {
                  message: messageInp,
                  chatId: chatData.chatId,
                },
                () => {
                  scrollToBottom();
                  setIsLoading(false);
                  setMessageInp("");
                },
              );
            }}
            disabled={isLoading}
            className="flex justify-center items-center w-max cursor-pointer bg-accent hover:bg-accent/80 p-1.5
           text-primary transition-colors duration-300 rounded-lg"
          >
            {isLoading ? <Spinner /> : <FiSend size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
