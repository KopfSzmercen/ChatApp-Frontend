import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { drawerWidth } from "./CustomDrawer";
import { Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  initialAppState,
  useAppContext
} from "../../contexts/AppStateProvider";
import { useSocket } from "../../contexts/SocketProvider";

export const appBarHeight = 60;

const DrawerAppBar: React.FC<{ handleDrawerToggle: () => void }> = (props) => {
  const navigate = useNavigate();
  const { setAppState } = useAppContext();
  const socket = useSocket();

  const handleLogout = async () => {
    socket?.disconnect();
    socket?.connect();
    setAppState(initialAppState);
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#3d5afe",
        height: `${appBarHeight}px`
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>

        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ marginLeft: "10px" }}
        >
          Chat App
        </Typography>

        <Button
          variant="contained"
          endIcon={<Logout />}
          sx={{
            color: "black",
            bgcolor: "#fafafa",
            "&:hover": { color: "#fafafa" }
          }}
          onClick={handleLogout}
        ></Button>
      </Toolbar>
    </AppBar>
  );
};

export default DrawerAppBar;
