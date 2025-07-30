'use client';

import { useEffect } from 'react';
import { TWasteBin, TTruck, TWasteType } from '@/types';
import { useSocketStore } from '@/lib/store/socketStore';
import { initSocket } from '@/lib/socket';

export const useSocketInitDashboard = () => {
  const { setBins, setTrucks, setWasteTypes } = useSocketStore();

  useEffect(() => {
    const socket = initSocket();

    socket.on('connect', () => {
      console.log('🟢 Connected to backend');
    });

    socket.on('bin-data-update', (data: TWasteBin[]) => {
      setBins(data);
    });

    socket.on('truck-data-update', (data: TTruck[]) => {
      setTrucks(data);
    });

    socket.on('waste-types-update', (data: TWasteType[]) => {
      setWasteTypes(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [setBins, setTrucks, setWasteTypes]);
};
