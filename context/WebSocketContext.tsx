import {URL_ROOT} from "@/constants/System";
import {useEffect, createContext, useRef, ReactNode} from 'react';
import {
  IChannels,
  ISocketMessage,
  IWebSocketProvider
} from '@/types/SocketMessage';

const WebSocketContext = createContext(null);

function WebSocketProvider({children}:IWebSocketProvider): ReactNode {
  const ws = useRef<WebSocket>({} as WebSocket);
  let socket:WebSocket = ws.current;

  const channelsRef = useRef<IChannels>({} as IChannels);
  const channels = channelsRef.current;

  const subscribe = (channel:keyof IChannels, callback: () => void):void => {
    // @ts-ignore
    channels[channel] = callback;
  };

  const unsubscribe = (channel: string):void => {
    // @ts-ignore
    delete channels[channel];
  };

  const sendMessage = (messageText: string): void => {
    socket.send(JSON.stringify(messageText));
  };

  useEffect(() => {
    socket = new WebSocket(`ws://${URL_ROOT}/socket`);
    socket.onopen = () => {
      console.log('Socket open');
    }
    socket.onclose = () => {
      console.log('Socket closed');
    }
    socket.onmessage = (messageEvent) => {
      const {
        type,
        meta
      }:ISocketMessage  = JSON.parse(messageEvent.data);

      const messageChannel:string = type;
      // @ts-ignore
      if (channels[messageChannel]) {
        // @ts-ignore
        channels[messageChannel](meta);
      }
    }

    return ():void => {socket.close()}
  }, []);

  return (
    // @ts-ignore
    <WebSocketContext.Provider value={{subscribe, unsubscribe, sendMessage}}>
      {children}
    </WebSocketContext.Provider>
  );
}
export {WebSocketContext, WebSocketProvider}
