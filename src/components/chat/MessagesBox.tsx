import React from "react";
import { Message as MessageType } from "../../contexts/ChatProvider";
import Message from "./Message";

const MessagesBox: React.FC<{ messages: MessageType[]; userId: string }> = ({
  messages,
  userId
}) => {
  console.log(messages);
  return (
    <>
      {messages.length > 0 &&
        messages.map((message) => {
          return (
            <>
              <Message
                received={message.senderId.toString() !== userId}
                key={`${message._id}${Math.random()}`}
                text={message.text}
                senderName={message.senderName}
                createdAt={message.createdAt}
              />
            </>
          );
        })}
    </>
  );
};

export default MessagesBox;
