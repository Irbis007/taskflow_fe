import { create } from "zustand";

interface ChatStore {
  activeChat: string | null;
  setActiveChat: (val: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChat: null,
  setActiveChat: (val) => set({ activeChat: val }),
}));
