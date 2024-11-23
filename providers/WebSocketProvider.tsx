import {ActiveUserStateProp} from "@/state/activeUserSlice";
import Constants from "expo-constants";
import {useEffect, createContext, useRef, ReactNode, useContext, MutableRefObject} from 'react';
import {
  IChannels,
  SocketMessageType,
  MetaDataType,
  IWebSocketProvider
} from '@/types/SocketMessage';
import {useSelector} from "react-redux";

const WS_URL = Constants.expoConfig?.extra?.WS_ROOT || '';

const WebSocketContext = createContext<{
  subscribe: (channel: keyof IChannels, callback: () => void) => void;
  unsubscribe: (channel: keyof IChannels) => void;
  sendMessage: (messageText: string) => void;
}>({
  subscribe: () => null,
  unsubscribe: () => null,
  sendMessage: () => null
});

const useWebsocket = () => {
  return useContext(WebSocketContext);
}

function WebSocketProvider({children}:IWebSocketProvider): ReactNode {
  const ws = useRef<WebSocket>({} as WebSocket);
  let socket:WebSocket = ws.current;
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  const channelsRef = useRef<IChannels>({} as IChannels);
  const channels = channelsRef.current;

  const subscribe = (channel:keyof IChannels, callback: () => void):void => {
    (channels[channel] as () => void) = callback;
  };

  const unsubscribe = (channel: keyof IChannels):void => {
    delete channels[channel];
  };

  const sendMessage = (messageText: string): void => {
    socket.send(JSON.stringify(messageText));
  };

  useEffect(() => {
    /**
     * If no user is logged in, don't initialize the websocket.
     * @TODO no reason to wait on a user session. Should instead just wait on app to be loaded and ready?
     */
    if (activeUser.id === 0) {
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
      }:SocketMessageType  = JSON.parse(messageEvent.data);

      const messageChannel: keyof IChannels = type;

      if (channels[messageChannel]) {
        (channels[messageChannel] as (arg1: MetaDataType)=> void)(meta);
      }
    }

    return ():void => {socket.close()}
  }, [activeUser]);

  return (
    <WebSocketContext.Provider value={{subscribe, unsubscribe, sendMessage}}>
      {children}
    </WebSocketContext.Provider>
  );
}
export {useWebsocket, WebSocketProvider}
