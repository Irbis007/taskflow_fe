import MessagesList from "./MessagesList";
import { SelectedChat } from "./SelectedChat";

export function Chat() {
  return (
    <div className="flex w-full h-full">
      <MessagesList />
      <SelectedChat />
    </div>
  );
}
