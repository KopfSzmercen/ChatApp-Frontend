import React, { Dispatch, SetStateAction, useContext, useState } from "react";

export interface Message {
  _id: string;
  text: string;
  senderId: string;
  chatRoomId: string;
  senderName: string;
  createdAt: string;
}
interface Chat {
  roomId: string;
  messages: Message[];
}

export const initialChatState: Chat = {
  roomId: "general_chat_room",
  messages: []
};

interface ChatContextType {
  chatState: Chat;
  setChatState: Dispatch<SetStateAction<Chat>>;
}

const ChatContext = React.createContext<ChatContextType>({
  chatState: initialChatState,
  setChatState: () => {}
});

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider: React.FC<{}> = (props) => {
  const [chatState, setChatState] = useState<Chat>(initialChatState);
  return (
    <ChatContext.Provider value={{ chatState, setChatState }}>
      {props.children}
    </ChatContext.Provider>
  );
};
