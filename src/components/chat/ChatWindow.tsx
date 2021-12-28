import { Home } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useAppContext } from "../../contexts/AppStateProvider";
import { Message as MessageType, useChat } from "../../contexts/ChatProvider";
import { useSocket } from "../../contexts/SocketProvider";
import MessageForm from "./MessageForm";
import MessagesBox from "./MessagesBox";

const ChatWindow = () => {
  const { chatState, setChatState } = useChat();
  const { appState } = useAppContext();

  const socket = useSocket();
  const messageText = useRef("");
  const myRef = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => myRef.current?.scrollIntoView();

  useEffect(() => {
    executeScroll();
  }, [chatState.messages]);

  useEffect(() => {
    //initial room join
    socket?.emit("join_room", {
      roomId: chatState.roomId,
      userId: appState.userId,
      previousRoom: ""
    });
    setChatState({ ...chatState, roomId: chatState.roomId });
    // eslint-disable-next-line
  }, []);

  socket?.off("room_messages").on("room_messages", (data: MessageType[]) => {
    setChatState({ ...chatState, messages: [...data] });
  });

  socket?.off("new_message").on("new_message", (data: MessageType) => {
    const updatedMessages = chatState.messages;
    updatedMessages.push(data);
    setChatState({ ...chatState, messages: [...updatedMessages] });
  });

  socket?.off("returned_room_id").on("returned_room_id", (roomId: string) => {
    if (roomId === chatState.roomId) return;
    socket.emit("join_room", {
      roomId,
      userId: appState.userId,
      previousRoom: chatState.roomId
    });
    setChatState({ roomId: roomId, messages: [] });
  });

  const updateText = (value: string) => {
    messageText.current = value;
  };

  const joinGeneral = () => {
    socket?.emit("join_room", {
      roomId: "general_chat_room",
      userId: appState.userId,
      previousRoom: chatState.roomId
    });
    setChatState({ roomId: "general_chat_room", messages: [] });
  };

  const handleSendMessage = () => {
    if (messageText.current === "") return;
    socket?.emit("new_message", {
      senderId: appState.userId,
      roomId: chatState.roomId,
      text: messageText.current,
      senderName: appState.username
    });
    messageText.current = "";
  };

  return (
    <Box
      sx={{
        maxHeight: "92vh",
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {chatState.roomId !== "general_chat_room" && (
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            position: "absolute",
            top: "70px",
            zIndex: "1000",
            cursor: "pointer"
          }}
          onClick={joinGeneral}
        >
          <Home />
        </Avatar>
      )}
      {chatState.roomId === "general_chat_room" && (
        <Box
          sx={{
            bgcolor: "secondary.main",
            position: "absolute",
            top: "70px",
            zIndex: "1000",
            padding: "5px 8px",
            borderRadius: "10px"
          }}
          onClick={joinGeneral}
        >
          <Typography color="#fafafa" fontWeight="bold">
            General channel
          </Typography>
        </Box>
      )}

      <Box
        key={Math.random()}
        sx={{
          marginTop: "40px",
          marginBottom: "20px",
          height: "80vh",
          padding: "20px 15px",
          borderBottom: "1px solid white",
          bgcolor: "backgroundColor.light",
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: "3px"
          },
          "::-webkit-scrollbar-track": {
            borderRadius: "5px"
          },
          "::-webkit-scrollbar-thumb": {
            background: "#1de9b6",
            borderRadius: "10px"
          }
        }}
      >
        <Box
          key={Math.random()}
          sx={{
            margin: "auto",
            maxWidth: "800px"
          }}
        >
          <MessagesBox messages={chatState.messages} userId={appState.userId} />
          {
            <div
              style={{
                height: "5px"
              }}
              ref={myRef}
              key={"dummy_scroll_div"}
            ></div>
          }
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          marginX: "auto",
          width: "80%",
          maxWidth: "500px"
        }}
        key={Math.random()}
      >
        <MessageForm
          key={Math.random()}
          updateText={updateText}
          handleSendMessage={handleSendMessage}
        />
      </Box>
    </Box>
  );
};

export default ChatWindow;
