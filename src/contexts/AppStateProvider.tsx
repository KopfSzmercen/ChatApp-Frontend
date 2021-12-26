import React, { Dispatch, SetStateAction, useContext, useState } from "react";

export interface User {
  id: string;
  username: string;
  isOnline: boolean;
}

interface AppState {
  userId: string;
  username: string;
  authToken: string;
  socketId: string;
  users: User[];
}

export const initialAppState: AppState = {
  userId: "",
  username: "",
  authToken: "",
  users: [],
  socketId: ""
};

interface AppContext {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

const AppStateContext = React.createContext<AppContext>({
  appState: initialAppState,
  setAppState: () => {}
});

export const useAppContext = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider: React.FC<{}> = (props) => {
  const [appState, setAppState] = useState<AppState>(initialAppState);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {props.children}
    </AppStateContext.Provider>
  );
};
