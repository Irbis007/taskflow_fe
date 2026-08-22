import { Outlet, useParams } from "react-router-dom";
import MessagesList from "./MessagesList";

export function Chat() {
  const chatId = useParams().chatId;
  return (
    <div className="flex w-full h-full">
      <MessagesList />
      {chatId ? <Outlet /> : "Select Chat"}
    </div>
  );
}
