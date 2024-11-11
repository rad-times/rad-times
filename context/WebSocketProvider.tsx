import {AuthContext} from "@/context/AuthProvider";
import Constants from "expo-constants";
import {useEffect, createContext, useRef, ReactNode, useContext} from 'react';
import {
  IChannels,
  ISocketMessage,
  IWebSocketProvider
} from '@/types/SocketMessage';
import _ from 'lodash';

const WS_URL = Constants.expoConfig?.extra?.WS_ROOT || '';

const WebSocketContext = createContext(null);

function WebSocketProvider({children}:IWebSocketProvider): ReactNode {
  const ws = useRef<WebSocket>({} as WebSocket);
  let socket:WebSocket = ws.current;
  const {userId} = useContext(AuthContext);

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
    if (userId === -1 || _.isNil(userId)) {
      return;
    }

    socket = new WebSocket(`${WS_URL}/socket`);

    socket.onopen = () => {
      console.log('Socket open');
    }

    socket.onclose = () => {
      console.log('Socket closed');
    }

    socket.onerror = (err ) => {
      console.error(err);
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
  }, [userId]);

  return (
    // @ts-ignore
    <WebSocketContext.Provider value={{subscribe, unsubscribe, sendMessage}}>
      {children}
    </WebSocketContext.Provider>
  );
}
export {WebSocketContext, WebSocketProvider}
