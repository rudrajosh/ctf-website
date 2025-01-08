import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SupabaseContextType {
  isConnected: boolean;
}

const SupabaseContext = createContext<SupabaseContextType>({ isConnected: false });

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.from('teams').select('count');
      setIsConnected(!error && data !== null);
    } catch {
      setIsConnected(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Connection Required</h2>
          <p className="text-gray-600 mb-6">
            Please click the "Connect to Supabase" button in the top right to set up your database connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SupabaseContext.Provider value={{ isConnected }}>
      {children}
    </SupabaseContext.Provider>
  );
}