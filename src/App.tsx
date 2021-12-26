import { Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/mainPage/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./contexts/SocketProvider";
import { AppStateProvider } from "./contexts/AppStateProvider";

function App() {
  return (
    <AppStateProvider>
      <SocketProvider>
        <BrowserRouter>
          <Box
            className="App"
            sx={{
              bgcolor: "backgroundColor.main",
              width: "100vw",
              height: "100vh",
              overflow: "hidden"
            }}
          >
            <Routes>
              <Route path="/" element={<LoginPage />} key="/" />
              <Route
                path="/register"
                element={<RegisterPage />}
                key="/register"
              />
              <Route path="/main" element={<MainPage />} key="/main" />
            </Routes>
          </Box>
        </BrowserRouter>
      </SocketProvider>
    </AppStateProvider>
  );
}

export default App;
