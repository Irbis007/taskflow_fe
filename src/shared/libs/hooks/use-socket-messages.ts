import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setQueryDataWithPartialQueryKey } from "@shared/utils";
import { socket } from "@shared/services";

export function useSocketMessages() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewMessage = ({ message }: { message: any }) => {
      setQueryDataWithPartialQueryKey({
        queryClient,
        path: "/api/chats/{id}",
        method: "get",
        updater(prev) {
          if (!prev) return prev;
          return { ...prev, messages: [...prev.messages, message] };
        },
      });
    };

    socket.on("chat:new-message", handleNewMessage);

    return () => {
      socket.off("chat:new-message", handleNewMessage);
    };
  }, [queryClient]);
}
