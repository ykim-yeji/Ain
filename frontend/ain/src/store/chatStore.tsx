import { create } from 'zustand';

interface Message {
    id: string | null;
    sender: 'user' | 'assistant';
    message: string;
    time: string;
  }
  
  interface MessagesStoreState {
    messages: Message[];
    addMessage: (message: Message) => void;
    clearMessages: () => void;
  }

const useMessagesStore = create<MessagesStoreState>((set) => ({
    messages: [],
    addMessage: (message:Message) => set((state) => ({ messages: [...state.messages, message] })),
    clearMessages: () => set({ messages: [] }),
  }))
  
  export default useMessagesStore