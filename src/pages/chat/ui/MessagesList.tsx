import { $userHooks } from "@entities/user/api";
import { SearchInput, Spinner } from "@shared/ui";
import { useEffect, useState } from "react";
import { socket } from "@shared/services";
import { ChatItem as ChatItemType, useAuthStore } from "@shared/models";
import { getLastMessageDate } from "@shared/utils";
import { useNavigate, useParams } from "react-router-dom";
import { URLS } from "@shared/consts";

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

  const chatId = useParams()?.chatId || ""

  const [search, setSearch] = useState("");
  const [usersOnline, setUsersOnline] = useState<string[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    const onOnlineUsers = (usersIds: string[]) => {
      console.log(usersIds)
      setUsersOnline(usersIds);
    };

    socket.on("users:online", onOnlineUsers);

    return () => {
      socket.off("users:online", onOnlineUsers);
    };
  }, []);

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
                  isOnline={usersOnline.includes(item.companion.id)}
                  key={i}
                  isActive={item.chatId === chatId}
                  setActiveChat={(id) => navigate(`${URLS.chat}/${id}`)}
                  createChat={(chatId) => createChat({ members: [chatId] })}
                  chatData={item}
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
  isOnline: boolean;
  setActiveChat: (val: string) => void;
  createChat: (val: string) => void;
  chatData: ChatItemType;
};

const ChatItem = ({
  isActive,
  isOnline: defIsOnline,
  setActiveChat,
  createChat,
  chatData: { chatId, chatName, companion, ...props },
}: ChatItemProps) => {
  const user = useAuthStore((state) => state.user);
  const [isOnline, setIsOnline] = useState(defIsOnline);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const onOnline = ({
      userId,
      isOnline: isUserOnline,
    }: {
      userId: string;
      isOnline: boolean;
    }) => {
      if (companion.id === userId && isOnline != isUserOnline) {
        setIsOnline(isUserOnline);
      }
    };
    socket.on("user:online", onOnline);
    return () => {
      socket.off("user:online", onOnline);
    };
  }, [isOnline, companion.id]);

  useEffect(() => {
    const onTypingStart = ({
      chatId: companionChatId,
      userId,
    }: {
      chatId: string;
      userId: string;
    }) => {
      if (companionChatId === chatId && userId !== user?.id) {
        setIsTyping(true);
      }
    };
    const onTypingEnd = ({
      chatId: companionChatId,
      userId,
    }: {
      chatId: string;
      userId: string;
    }) => {
      if (companionChatId === chatId && userId !== user?.id) {
        setIsTyping(false);
      }
    };
    socket.on("typing:start", onTypingStart);
    socket.on("typing:end", onTypingEnd);
    return () => {
      socket.off("typing:start", onTypingStart);
      socket.off("typing:end", onTypingEnd);
    };
  }, [isOnline, companion.id, user?.id, chatId]);

  return (
    <div
      onClick={() => {
        if (chatId === null) {
          createChat(companion.id);
        } else {
          setActiveChat(chatId);
        }
      }}
      className={`flex p-2 items-center gap-2 w-full hover:bg-accent/10 cursor-pointer border-l-4
      ${isActive ? "bg-accent/10 border-accent" : "border-transparent "}`}
    >
      <div className="relative w-11 h-11 shrink-0 flex justify-center items-center rounded-full bg-accent/20 text-lg text-accent">
        <div
          className={`absolute right-0.5 bottom-0.5 rounded-full ${isOnline ? "bg-success w-2.5 h-2.5 animate-pulse" : "bg-muted w-2 h-2"}
            `}
        ></div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="">{chatName}</div>
          <div className="text-muted text-sm">
            {getLastMessageDate(props?.lastMessage?.updatedAt)}
          </div>
        </div>
        <div className="truncate w-50 text-sm text-secondary">
          {isTyping ? "Typing..." : props?.lastMessage?.message || ""}
        </div>
      </div>
    </div>
  );
};
