import { createContext, useContext, useEffect, useState } from 'react';
import useGetMe from './common/utils/customHooks/useGetMe';

const WebSocketContext = createContext<WebSocket | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

type WebSocketProviderProps = {
  children: React.ReactNode;
};

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const { data: userData } = useGetMe();

  useEffect(() => {
    if (userData && !webSocket) {
      const webSocket = new WebSocket('wss://playpack.shop/ws/chat');
      setWebSocket(webSocket);
      console.log('이곳은 웹소켓 프로바이더', userData);
    }

    // return () => {
    //   webSocket.close();
    // };
    // }, [webSocket, userData]);
  }, [userData]);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
