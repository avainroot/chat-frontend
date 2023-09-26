import { settings } from "@helpers";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SessionsContext } from "./Sessions";

interface ISocketContext {
  socket: any
}

export const SocketContext = React.createContext<ISocketContext>({
  socket: null
})

export const SocketContextProvider = ({children}:any) => {
  const wsURL = settings.WS_PREFIX;
  const [socket, setSocket] = useState<any>(null);
  const { session } = useContext( SessionsContext );

  useEffect(()=>{

    if(wsURL && session) {
      const ws = io(wsURL,{
        auth: {
          sess: JSON.parse(session).session_hash
        }
      });

      setSocket(ws);

    }
  },[session, wsURL])

  return(
    <SocketContext.Provider
      value={{
        socket: socket
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)