"use client";

import { createContext, useContext, useEffect, ReactNode, useCallback } from "react";
import { useSocketStore } from "@/lib/store/socketStore";
import { initSocket, getSocket, disconnectSocket } from "@/lib/socket";
import { TWasteBin, TTruck, TWasteType } from "@/types";

interface SocketContextType {
  requestDashboardData: () => void;
  simulateBinUpdate: (data: any) => void;
  simulateTruckUpdate: (data: any) => void;
}

const SocketContext = createContext<SocketContextType>({
  requestDashboardData: () => {},
  simulateBinUpdate: () => {},
  simulateTruckUpdate: () => {},
});

export const useSocketContext = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { 
    setConnected, 
    setConnectionError, 
    setBins, 
    setTrucks,
    setWasteTypes 
  } = useSocketStore();
  
  useEffect(() => {
    const socket = initSocket();

    const handleConnect = () => {
      console.log('🟢 Connected to backend');
      setConnected(true);
      setConnectionError(null);
    };

    const handleDisconnect = (reason: string) => {
      console.log('🔴 Disconnected from backend, reason:', reason);
      setConnected(false);
    };

    const handleBinUpdate = (data: TWasteBin[]) => {
      console.log('📊 Received bin data update:', data.length, 'bins');
      setBins(data);
    };

    const handleTruckUpdate = (data: TTruck[]) => {
      console.log('🚛 Received truck data update:', data.length, 'trucks');
      setTrucks(data);
    };

    const handleWasteTypesUpdate = (data: TWasteType[]) => {
      console.log('Received waste types data update:', data.length, 'wasteTypes');
      setWasteTypes(data);
    };

    const handleConnectError = (error: any) => {
      console.error('🔴 Socket connection error:', error);
      setConnected(false);
      setConnectionError(error.message || 'Connection failed');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('bin-data-update', handleBinUpdate);
    socket.on('truck-data-update', handleTruckUpdate);
    socket.on('waste-types-update', handleWasteTypesUpdate);
    socket.on('connect_error', handleConnectError);

    setConnected(socket.connected);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('bin-data-update', handleBinUpdate);
      socket.off('truck-data-update', handleTruckUpdate);
      socket.off('waste-types-update', handleWasteTypesUpdate);
      socket.off('connect_error', handleConnectError);
    };
  }, [setConnected, setConnectionError, setBins, setTrucks]);

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  const requestDashboardData = useCallback(() => {
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit('request-dashboard-data');
    }
  }, []);

  const simulateBinUpdate = useCallback((data: any) => {
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit('simulate-bin-update', data);
    }
  }, []);

  const simulateTruckUpdate = useCallback((data: any) => {
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit('simulate-truck-update', data);
    }
  }, []);

  return (
    <SocketContext.Provider 
      value={{ 
        requestDashboardData,
        simulateBinUpdate,
        simulateTruckUpdate 
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}