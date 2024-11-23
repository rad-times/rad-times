import {ReactNode} from "react";

export type MetaDataType = {
  id: string | number[];
  senderId: number;
  createdAt: Date;
}

export type SocketMessageType = {
  type: keyof IChannels;
  meta: MetaDataType;
}

export interface IWebSocketProvider {
  children: ReactNode|ReactNode[]
}

export interface IChannels {
  (key: string): () => void
}
