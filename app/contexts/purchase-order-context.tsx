import React, { createContext, ReactElement, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import entities from 'app/utils/entities';
import { POHeader, PurchaseOrderContextType } from '@types';

const PurchaseOrderContext = createContext<PurchaseOrderContextType | undefined>(undefined);

export function usePurchaseOrder(): PurchaseOrderContextType {
    const context = useContext(PurchaseOrderContext);
    if (!context) {
        throw new Error('usePurchaseOrder must be used within a PurchaseOrderProvider');
    }
    return context;
}

export function PurchaseOrderProvider({ children }: { children: ReactNode }): ReactElement {
    const [poHeaders, setPOHeaders] = useState<POHeader[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPOHeaders = async (plant?: string, storageLocation?: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const authToken = await AsyncStorage.getItem('authToken');
            let url = `${entities.SERVICE_HOST}${entities.SERVICE_URL}${entities.PO_HEADER_ENTITY}?$expand=${entities.PO_EXPAND}`;

            if (plant || storageLocation) {
                const filters = [];
                if (plant) filters.push(`Werks eq '${plant}'`);
                if (storageLocation) filters.push(`Lgort eq '${storageLocation}'`);
                url += `&$filter=${filters.join(' and ')}`;
            }

            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: authToken || '',
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const cleanResults =
                data.d?.results.map((item: any) => {
                    const { __metadata, ...cleanItem } = item;
                    return cleanItem;
                }) || [];
            setPOHeaders(cleanResults);
            await storePOHeadersInStorage(cleanResults);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch PO headers');
        } finally {
            setIsLoading(false);
        }
    };

    const storePOHeadersInStorage = async (data: POHeader[]) => {
        try {
            await AsyncStorage.setItem('poHeaders', JSON.stringify(data));
        } catch (error) {
            console.error('Error storing PO headers:', error);
        }
    };

    useEffect(() => {
        async function loadStoredPOHeaders() {
            try {
                const storedData = await AsyncStorage.getItem('poHeaders');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setPOHeaders(parsedData);
                }
            } catch (error) {
                console.error('Error loading stored PO headers:', error);
            }
        }

        loadStoredPOHeaders();
    }, []);

    return (
        <PurchaseOrderContext.Provider
            value={{
                poHeaders,
                isLoading,
                error,
                fetchPOHeaders,
            }}
        >
            {children}
        </PurchaseOrderContext.Provider>
    );
}
