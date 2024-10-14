import uuid from 'react-native-uuid';
import {ISocketMessage} from '@/types/SocketMessage';

export function createSocketMessage(type: string, activeUserId: number): ISocketMessage {
  return {
    type: type,
    meta: {
      id: uuid.v4(),
      senderId: activeUserId,
      createdAt: new Date()
    }
  }
}
