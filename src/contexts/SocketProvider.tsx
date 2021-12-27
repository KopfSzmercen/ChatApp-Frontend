import React, { useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = React.createContext<undefined | Socket>(undefined);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{}> = (props) => {
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const newSocket = io("https://limitless-sands-33378.herokuapp.com");
    setSocket(newSocket);

    socket?.on("error", (error) => {
      console.log(error);
    });

    return () => {
      newSocket.close();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
