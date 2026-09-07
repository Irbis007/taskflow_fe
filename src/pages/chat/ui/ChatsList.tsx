import { $userHooks } from "@entities/user/api";
import { SearchInput, Spinner } from "@shared/ui";
import { useEffect, useState } from "react";
import { ChatItem as ChatItemType, useAuthStore } from "@shared/models";
import { getLastMessageDate } from "@shared/utils";
import { useNavigate, useParams } from "react-router-dom";
import { URLS } from "@shared/consts";
import { socket } from "@shared/services";
import { $chatHooks } from "@entities/chat/api";

export default function ChatsList() {
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  const { data: chats, isLoading: isUsersLoading } = $userHooks.getForChat({
    name: querySearch,
  });
  const { mutateAsync: createChat } = $chatHooks.createChat();

  const chatId = useParams()?.chatId || "";


  const [usersOnline, setUsersOnline] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const handleUsersOnline = (users: string[]) => {
      console.log("USERS ONLINE:", users);
      setUsersOnline(users);
    };

    socket.on("users:online", handleUsersOnline);


    if (socket.connected) {
      socket.emit("users:getOnline");
    }

    return () => {
      socket.off("users:online", handleUsersOnline);
    };
  }, [socket]);

  return (
    <div className=" shrink-0 w-70 border-r border-default">
      <div className="py-6 px-4 border-b border-default text-xl font-bold">
        Message
      </div>
      <div className="p-3 border-b border-default">
        <SearchInput value={search} onChange={setSearch} onSearch={() => setQuerySearch(search)}/>
      </div>
      <div className="">
        <div className="p-2 text-secondary text-sm tracking-widest uppercase">
          channels
        </div>
        <div className="mt-1">
          {
            // chats.
          }
          {/* {groups.map((item, i) => (
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
          ))} */}
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
          ) : !!search.length && !chats.chats.length ? (
            <div className="p-2 text-secondary">
              There is no users with this name
            </div>
          ) : (
            chats.chats.map((item, i) => {
              return (
                <ChatItem
                  isOnline={usersOnline.includes(item.companion.id)}
                  key={i}
                  isActive={item.id === chatId}
                  setActiveChat={(id) => navigate(`${URLS.chat}/${id}`)}
                  createChat={(userId) =>
                    createChat({ members: [userId] }).then((chat) =>
                      navigate(`${URLS.chat}/${chat.id}`),
                    )
                  }
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
  chatData: { id, chatName, companion, ...props },
}: ChatItemProps) => {
  const user = useAuthStore((state) => state.user);
  const [isOnline, setIsOnline] = useState(defIsOnline);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOnline(defIsOnline);
  }, [defIsOnline]);

  useEffect(() => {
    const onOnline = ({ userId }: { userId: string }) => {
      if (companion.id === userId) {
        setIsOnline(true);
      }
    };
    const onOffline = ({ userId }: { userId: string }) => {
      if (companion.id === userId) {
        setIsOnline(false);
      }
    };
    socket?.on("user:online", onOnline);
    socket?.on("user:offline", onOffline);
    return () => {
      socket?.off("user:online", onOnline);
      socket?.off("user:offline", onOffline);
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
      if (companionChatId === id && userId !== user?.id) {
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
      if (companionChatId === id && userId !== user?.id) {
        setIsTyping(false);
      }
    };
    socket?.on("typing:start", onTypingStart);
    socket?.on("typing:end", onTypingEnd);
    return () => {
      socket?.off("typing:start", onTypingStart);
      socket?.off("typing:end", onTypingEnd);
    };
  }, [id, user?.id]);
  return (
    <div
      onClick={() => {
        if (id === null) {
          createChat(companion.id);
        } else {
          setActiveChat(id);
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
