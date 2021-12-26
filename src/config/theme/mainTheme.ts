import { createTheme } from "@mui/material/styles";
import { grey, indigo, pink } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    primary: Palette["primary"];
    secondary: Palette["primary"];
    backgroundColor: Palette["primary"];
  }
  interface PaletteOptions {
    primary?: PaletteOptions["primary"];
    secondary?: PaletteOptions["primary"];
    backgroundColor: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Box" {
  interface BoxPropsColorOverrides {
    backgroundColor: true;
    primary: true;
    secondary: true;
  }
}

declare module "@mui/material/Avatar" {
  interface AvatarPropsColorOverrides {
    backgroundColor: true;
    primary: true;
    secondary: true;
    color: true;
  }
}

const mainTheme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      dark: indigo[700],
      light: indigo[400],
      contrastText: "#fafafa"
    },
    secondary: {
      main: pink[500],
      dark: pink[700],
      light: grey[200]
    },
    backgroundColor: {
      main: "#231F20",
      light: "#2A2728",
      contrastText: grey[100]
    }
  }
});

export default mainTheme;
