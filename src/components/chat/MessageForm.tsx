import React, { ChangeEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";

const MessageForm: React.FC<{
  updateText: (updateText: string) => void;
  handleSendMessage: () => void;
}> = ({ updateText, handleSendMessage }) => {
  const [inputText, setInputText] = useState("");

  const toggleSendMessage = () => {
    handleSendMessage();
    setInputText("");
  };
  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={2}
        sx={{
          bgcolor: "#fafafa",
          border: "none",
          borderRadius: "4px"
        }}
        value={inputText}
        color="secondary"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          updateText(event.target.value);
          setInputText(event.target.value);
        }}
      />
      <Button
        sx={{ marginLeft: "15px" }}
        variant="contained"
        color="secondary"
        endIcon={<Send />}
        onClick={toggleSendMessage}
      ></Button>
    </>
  );
};

export default MessageForm;
