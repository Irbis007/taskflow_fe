import { BodyResponseType } from "@shared/models";

export function chatToChatItem(
  chat: BodyResponseType<"get", "/api/chats/{id}">,
): BodyResponseType<"get", "/api/chats">["chats"][number] {
  return {
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
    chatName: chat.chatName,
    lastMessage: chat.messages[chat.messages.length - 1],
    id: chat.id,
    companion: chat.companion,
    pinned: chat.pinned,
  };
}
