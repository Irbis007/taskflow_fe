import { Outlet, useParams } from "react-router-dom";
import MessagesList from "./MessagesList";
import { IoChatbubblesOutline } from "react-icons/io5";

export function Chat() {
  const chatId = useParams().chatId;
  return (
    <div className="flex w-full h-full">
      <MessagesList />
      {chatId ? (
        <Outlet />
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4 text-secondary">
          <IoChatbubblesOutline size={120}/>
          <span className="text-3xl">Select chat</span>
        </div>
      )}
    </div>
  );
}
