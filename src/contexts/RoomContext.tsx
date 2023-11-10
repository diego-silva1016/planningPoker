'use client'
import { ReactNode, createContext, useContext, useState } from 'react'
 
interface IRoomContext {
    roomName: string
    userName: string
    setUserName: Function
    setRoomName: Function
}

const RoomContext = createContext({} as IRoomContext)

interface IRoomProviderProps {
    children: ReactNode
  }

export const RoomProvider = ({ children }: IRoomProviderProps) => {
    const [roomName, setRoomName] = useState('')
    const [userName, setUserName] = useState('')


    return (
        <RoomContext.Provider value={{ roomName, userName, setUserName, setRoomName }}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    return useContext(RoomContext)
}