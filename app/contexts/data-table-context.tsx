import React, { createContext, ReactElement, ReactNode, useContext, useState, useEffect } from 'react';
import entities from 'app/utils/entities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTableContextType, DataTableItem } from '@types';

const DataTableContext = createContext<DataTableContextType | undefined>(undefined);

export function useDataTable(): DataTableContextType {
    const context = useContext(DataTableContext);
    if (!context) {
        throw new Error('useDataTable must be used within a DataTableProvider');
    }
    return context;
}

export function DataTableProvider({ children }: { children: ReactNode }): ReactElement {
    const [plantsTable, setPlantsTable] = useState<DataTableItem[]>([]);
    const [storageLocationsTable, setStorageLocationsTable] = useState<DataTableItem[]>([]);
    const [imStorageLocationsTable, setImStorageLocationsTable] = useState<DataTableItem[]>([]);
    const [wmStorageLocationsTable, setWmStorageLocationsTable] = useState<DataTableItem[]>([]);
    const [movementTypesTable, setMovementTypesTable] = useState<DataTableItem[]>([]);
    const [stockTypesTable, setStockTypesTable] = useState<DataTableItem[]>([]);
    const [specialIndicatorsTable, setSpecialIndicatorsTable] = useState<DataTableItem[]>([]);
    const [warehousesTable, setWarehousesTable] = useState<DataTableItem[]>([]);
    const [ewmWarehousesTable, setEwmWarehousesTable] = useState<DataTableItem[]>([]);
    const [storageTypesTable, setStorageTypesTable] = useState<DataTableItem[]>([]);
    const [ewmStorageTypesTable, setEwmStorageTypesTable] = useState<DataTableItem[]>([]);
    const [storageUnitTypesTable, setStorageUnitTypesTable] = useState<DataTableItem[]>([]);
    const [differenceIndicatorsTable, setDifferenceIndicatorsTable] = useState<DataTableItem[]>([]);
    const [stockCategoriesTable, setStockCategoriesTable] = useState<DataTableItem[]>([]);
    const [ewmActivityAreasTable, setEwmActivityAreasTable] = useState<DataTableItem[]>([]);
    const [queuesTable, setQueuesTable] = useState<DataTableItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDataTable = async () => {
        setIsLoading(true);
        setError(null);

        const typeToStateMap = {
            PL: setPlantsTable,
            ML: setStorageLocationsTable,
            IM: setImStorageLocationsTable,
            WL: setWmStorageLocationsTable,
            MV: setMovementTypesTable,
            PT: setStockTypesTable,
            SI: setSpecialIndicatorsTable,
            WH: setWarehousesTable,
            EW: setEwmWarehousesTable,
            ST: setStorageTypesTable,
            ES: setEwmStorageTypesTable,
            UT: setStorageUnitTypesTable,
            DI: setDifferenceIndicatorsTable,
            SC: setStockCategoriesTable,
            AT: setEwmActivityAreasTable,
            QU: setQueuesTable,
        };

        const authToken = await AsyncStorage.getItem('authToken');

        try {
            const promises = Object.keys(typeToStateMap).map((type) => {
                const url = `${entities.SERVICE_HOST}${entities.SERVICE_URL}${entities.DATA_TABLE_ENTITY}?$filter=Type eq '${type}'`;
                return fetch(url, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authToken || '',
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const cleanResults =
                            data.d?.results.map((item: any) => {
                                const { __metadata, ...cleanItem } = item;
                                return cleanItem;
                            }) || [];

                        const setState = typeToStateMap[type as keyof typeof typeToStateMap];
                        setState(cleanResults);
                        storeDataTableInStorage(type, cleanResults);
                    });
            });

            await Promise.all(promises);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data table');
        } finally {
            setIsLoading(false);
        }
    };

    const storeDataTableInStorage = async (type: string, data: DataTableItem[]) => {
        try {
            await AsyncStorage.setItem(`dataTable_${type}`, JSON.stringify(data));
        } catch (error) {
            console.error(`Error storing ${type} data table:`, error);
        }
    };

    useEffect(() => {
        async function loadStoredDataTables() {
            try {
                const typeToStateMap = {
                    PL: setPlantsTable,
                    ML: setStorageLocationsTable,
                    IM: setImStorageLocationsTable,
                    WL: setWmStorageLocationsTable,
                    MV: setMovementTypesTable,
                    PT: setStockTypesTable,
                    SI: setSpecialIndicatorsTable,
                    WH: setWarehousesTable,
                    EW: setEwmWarehousesTable,
                    ST: setStorageTypesTable,
                    ES: setEwmStorageTypesTable,
                    UT: setStorageUnitTypesTable,
                    DI: setDifferenceIndicatorsTable,
                    SC: setStockCategoriesTable,
                    AT: setEwmActivityAreasTable,
                    QU: setQueuesTable,
                };

                for (const type of Object.keys(typeToStateMap)) {
                    const storedData = await AsyncStorage.getItem(`dataTable_${type}`);
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);
                        const setState = typeToStateMap[type as keyof typeof typeToStateMap];
                        setState(parsedData);
                    }
                }
            } catch (error) {
                console.error('Error loading stored data tables:', error);
            }
        }

        loadStoredDataTables();
    }, []);

    return (
        <DataTableContext.Provider
            value={{
                plantsTable,
                storageLocationsTable,
                imStorageLocationsTable,
                wmStorageLocationsTable,
                movementTypesTable,
                stockTypesTable,
                specialIndicatorsTable,
                warehousesTable,
                ewmWarehousesTable,
                storageTypesTable,
                ewmStorageTypesTable,
                storageUnitTypesTable,
                differenceIndicatorsTable,
                stockCategoriesTable,
                ewmActivityAreasTable,
                queuesTable,
                isLoading,
                error,
                fetchDataTable,
            }}
        >
            {children}
        </DataTableContext.Provider>
    );
}
