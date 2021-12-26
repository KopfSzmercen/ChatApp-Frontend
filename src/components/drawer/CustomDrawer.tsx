import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import DrawerAppBar from "./DrawerAppBar";
import UserList from "../usersList/UserList";

export const drawerWidth = 260;

const CustomDrawer: React.FC<{
  window?: () => Window;
}> = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const DrawerBox = (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "backgroundColor.light",
          padding: "10px",
          borderRight: "1px solid #3f51b5"
        }}
      >
        <UserList />
        <Toolbar />
        <Box sx={{ height: "20px" }}></Box>
      </Box>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%"
      }}
    >
      <CssBaseline />

      <DrawerAppBar handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            },
            border: "none"
          }}
        >
          {DrawerBox}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none"
            }
          }}
          open
        >
          {DrawerBox}
        </Drawer>
      </Box>
    </Box>
  );
};

export default CustomDrawer;
