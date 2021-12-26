import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomAvatar from "./CustomAvatar";
import { useSocket } from "../../contexts/SocketProvider";
import { useAppContext } from "../../contexts/AppStateProvider";
import EmailIcon from "@mui/icons-material/Email";

const UserListItem: React.FC<{
  username: string;
  userId: string;
  isOnline: boolean;
  display: boolean;
}> = (props) => {
  const { appState } = useAppContext();
  const socket = useSocket();
  const [isOnline, setIsOnline] = useState(props.isOnline);
  const [isActive, setIsActive] = useState(false);
  const [isUnseenMessage, setIsUnseenMessage] = useState(false);
  const toggleChangeRoom = () => {
    setIsActive(true);
    socket?.emit("user_find_room", {
      user1Id: appState.userId,
      user2Id: props.userId
    });
  };

  useEffect(() => {
    socket?.on("user_status_online", (userId: string) => {
      if (userId === props.userId) setIsOnline(true);
    });

    socket?.on("user_status_offline", (userId: string) => {
      if (userId === props.userId) setIsOnline(false);
    });

    socket?.on("this_user_active", (userId: string) => {
      if (userId === props.userId) {
        setIsActive(true);
        setIsUnseenMessage(false);
      } else setIsActive(false);
    });
    socket?.on("received_message", (senderId: string) => {
      if (senderId === props.userId) setIsUnseenMessage(true);
    });
    return () => {
      socket?.off("user_status_online");
      socket?.off("user_status_offline");
      socket?.off("this_user_active");
      socket?.off("received_message");
    };
  }, [socket, props.userId]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "250px",
        padding: "5px 10px",
        marginY: "15px",
        border: isActive ? "2px solid #00bcd4" : "2px solid #58595B",
        borderRadius: "12px",
        display: props.display ? "flex" : "none",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": { bgcolor: "#6D6E71" },
        transition: "0.2s"
      }}
      onClick={toggleChangeRoom}
    >
      {isOnline ? (
        <CustomAvatar username={props.username} />
      ) : (
        <Avatar alt={props.username} sx={{ bgcolor: "#9c27b0" }}>
          {props.username.substring(0, 1)}
        </Avatar>
      )}
      <Typography color="#fafafa" sx={{ marginLeft: "10px" }}>
        {props.username}
      </Typography>
      {!isActive && isUnseenMessage && (
        <EmailIcon sx={{ marginLeft: "auto", color: "#41B619" }} />
      )}
    </Box>
  );
};

export default React.memo(UserListItem);
