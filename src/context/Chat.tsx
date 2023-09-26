import { RoomProps } from "@types"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"

interface IChat {
  room: RoomProps | undefined
  setRoom: (room: RoomProps) => void
  roomsList: RoomProps[] | []
  setRoomsList: Dispatch<SetStateAction<RoomProps[] | []>>
  tempUpload: any
  setTempUpload: Dispatch<SetStateAction<any>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const ChatContext = React.createContext<IChat>({
  room: undefined,
  setRoom: () => {},
  roomsList: [],
  setRoomsList: () => {},
  tempUpload: {}, 
  setTempUpload: () => {},
  refresh: false,
  setRefresh: () => {}
})

export const ChatContextProvider = ({children}:any) => {

  const [currentRoom, setCurrentRoom] = useState<RoomProps | undefined>();
  const [roomsList, setRoomsList] = useState<RoomProps[] | []>([]);
  const [tempUpload, setTempUpload] = useState<any>({});
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{
      room: currentRoom || undefined,
      setRoom: setCurrentRoom,
      roomsList: roomsList,
      setRoomsList: setRoomsList,
      tempUpload: tempUpload,
      setTempUpload: setTempUpload,
      refresh: refresh,
      setRefresh: setRefresh
    }}>
      {children}
    </ChatContext.Provider>
  )
} 

export const useChatContext = () => useContext(ChatContext)