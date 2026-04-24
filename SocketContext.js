import {createContext, useContext, useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import AuthContext from './AuthContext';
import {BASE_URL} from './urls/url.js';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {token, userId} = useContext(AuthContext);

  useEffect(() => {
    if (token && userId) {
      const socket = io(BASE_URL, {
        query: {
          userId: userId,
        },
      });

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token, userId]);
  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  );
};