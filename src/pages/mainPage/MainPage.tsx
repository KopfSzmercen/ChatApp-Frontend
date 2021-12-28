import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../../components/chat/ChatWindow";
import CustomDrawer from "../../components/drawer/CustomDrawer";
import { useAppContext } from "../../contexts/AppStateProvider";
import { ChatContextProvider } from "../../contexts/ChatProvider";
import { useSocket } from "../../contexts/SocketProvider";

const MainPage = () => {
  const { appState } = useAppContext();
  const socket = useSocket();
  const navigation = useNavigate();

  useEffect(() => {
    if (!appState.authToken) navigation("/", { replace: true });
    socket?.emit("user_status_online", appState.userId);
    //eslint-disable-next-line
  }, [appState.authToken, appState.userId]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        maxHeight: "98vh",
        overflow: "hidden"
      }}
    >
      <CustomDrawer />
      <ChatContextProvider>
        <ChatWindow />
      </ChatContextProvider>
    </Box>
  );
};

export default MainPage;
