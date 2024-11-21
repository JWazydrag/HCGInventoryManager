import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { NetworkContextType } from '@types';

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

function useNetwork(): NetworkContextType {
    const context = useContext(NetworkContext);
    if (!context) {
        throw new Error('useNetwork must be used within a NetworkProvider');
    }
    return context;
}

const NetworkProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [isConnected, setIsConnected] = useState(true);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setIsConnected(!!state.isConnected);
            setIsInternetReachable(state.isInternetReachable);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider
            value={{
                isConnected,
                isInternetReachable,
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
};

export { NetworkProvider, useNetwork };
