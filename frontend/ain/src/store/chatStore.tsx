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
    addPrevMessages: (newMessages: Message[]) => void; 
    clearMessages: () => void;
  }


  export const useMessagesStore = create<MessagesStoreState>((set) => ({
    messages: [],
    addMessage: (message:Message) => set((state) => ({ messages: [...state.messages, message] })),
    addPrevMessages: (prevMessages: Message[]) => set((state) => ({ messages: [...prevMessages, ...state.messages] })), 
    clearMessages: () => set({ messages: [] }),
  }))
  



