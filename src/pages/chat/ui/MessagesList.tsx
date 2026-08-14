import { $userHooks } from "@entities/user/api";
import { SearchInput, Spinner } from "@shared/ui";
import { useState } from "react";
import { useChatStore } from "../model";
import { socket } from "@shared/services";
import { useAuthStore } from "@shared/models";

const groups = [
  {
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, repellendus!",
    lastMessageTime: "12:41",
    groupTitle: "General",
    id: 1,
  },
  {
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, repellendus!",
    lastMessageTime: "12:41",
    groupTitle: "Bugs",
    id: 2,
  },
  {
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, repellendus!",
    lastMessageTime: "12:41",
    groupTitle: "GeneraDesignl",
    id: 3,
  },
];

export default function MessagesList() {
  const { data: chats, isLoading: isUsersLoading } = $userHooks.getForChat();
  const { mutateAsync: createChat } = $userHooks.createChat();
  const activeChat = useChatStore((state) => state.activeChat);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const [search, setSearch] = useState("");

  return (
    <div className="w-70 border-r border-default">
      <div className="py-6 px-4 border-b border-default text-xl font-bold">
        Message
      </div>
      <div className="p-3 border-b border-default">
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <div className="">
        <div className="p-2 text-secondary text-sm tracking-widest uppercase">
          channels
        </div>
        <div className="mt-1">
          {groups.map((item, i) => (
            <div
              key={i}
              className={`flex p-2 items-center gap-2 w-full hover:bg-accent/10 cursor-pointer border-l-4 `}
            >
              <div className="w-11 h-11 shrink-0 flex justify-center items-center rounded-full bg-success/20 text-lg text-success">
                #
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="">{item.groupTitle}</div>
                  <div className="text-muted text-sm">
                    {item.lastMessageTime}
                  </div>
                </div>
                <div className="truncate w-50 text-sm text-secondary">
                  {item.lastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="p-2 text-secondary text-sm tracking-widest uppercase">
          DIRECT
        </div>
        <div className="mt-1">
          {isUsersLoading || !chats ? (
            <div className="flex items-center justify-center mt-4">
              <Spinner size={32} />
            </div>
          ) : (
            chats.chats.map((item, i) => {
              return (
                <ChatItem
                  {...item}
                  key={i}
                  isActive={item.chatId === activeChat}
                  setActiveChat={setActiveChat}
                  companionId={item.companion.id}
                  createChat={(chatId) => createChat({ members: [chatId] })}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

type ChatItemProps = {
  isActive: boolean;
  setActiveChat: (val: string) => void;
  chatId: string | null;
  chatName: string;
  companionId: string;
  createChat: (val: string) => void;
};

const ChatItem = ({
  isActive,
  setActiveChat,
  chatId,
  chatName,
  companionId,
  createChat,
}: ChatItemProps) => {
  const user = useAuthStore((state) => state.user);
  const [isOnline, setIsOnline] = useState(false);

  socket.on("user:online", ({ userId, isOnline }) => {
    console.log('isOnline', userId, isOnline)
    if (user?.id === userId) {
      setIsOnline(isOnline);
    }
  });

  return (
    <div
      onClick={() => {
        if (chatId === null) {
          createChat(companionId);
        } else {
          setActiveChat(chatId);
        }
      }}
      className={`flex p-2 items-center gap-2 w-full hover:bg-accent/10 cursor-pointer border-l-4
      ${isActive ? "bg-accent/10 border-accent" : "border-transparent "}`}
    >
      <div className="relative w-11 h-11 shrink-0 flex justify-center items-center rounded-full bg-accent/20 text-lg text-accent">
        <div
          className={`absolute right-0.5 bottom-0.5 w-2 h-2 rounded-full ${isOnline ? "bg-success" : "bg-muted"}`}
        ></div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="">{chatName}</div>
          <div className="text-muted text-sm">
            {/* {item.lastMessageTime} */}
          </div>
        </div>
        <div className="truncate w-50 text-sm text-secondary">
          {/* {item.lastMessage} */}
        </div>
      </div>
    </div>
  );
};
