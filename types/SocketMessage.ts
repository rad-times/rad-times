import {ReactNode} from "react";

export type ISocketMessage = {
  type: string
  meta: {
    id: string | number[]
    senderId: number
    createdAt: Date
  }
}

export interface IWebSocketProvider {
  children: ReactNode|ReactNode[]
}

export interface IChannels {
  (key: string): () => void
}
