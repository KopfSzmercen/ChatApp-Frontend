import { Box, Typography } from "@mui/material";
import React from "react";

const Message: React.FC<{
  received: boolean;
  text: string;
  senderName: string;
  createdAt: string;
}> = (props) => {
  const conditionalStyle = {
    bgcolor: props.received ? "secondary.light" : "primary.main",
    marginLeft: props.received ? "10px" : "auto",
    color: props.received ? "black" : "#fafafa",
    marginRight: props.received ? "" : "10px"
  };
  const formatTime = `  ${new Date(props.createdAt).getHours()}:${(
    "0" + new Date(props.createdAt).getMinutes()
  ).slice(-2)}`;

  return (
    <Box
      sx={{
        ...conditionalStyle,
        maxWidth: "250px",
        borderRadius: "10px",
        marginTop: "50px",
        padding: "10px",
        display: "flex",
        position: "relative"
      }}
    >
      <Typography sx={{ position: "absolute", top: "-23px", color: "#fafafa" }}>
        {props.senderName + ": "}
        {formatTime}
      </Typography>
      <Typography sx={{ marginLeft: "10px" }}>{props.text}</Typography>
    </Box>
  );
};

export default React.memo(Message);
