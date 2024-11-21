import React, { ReactElement, useState, useRef } from 'react';
import { View, Animated, FlatList } from 'react-native';
import { SearchPanel, Button, CountDisplay, HeaderList } from '@components';
import styles from './po-receiving.styles';
import { useDataTable } from '@contexts/data-table-context';
import { usePurchaseOrder } from '@contexts/purchase-order-context';

export default function POReceiving(): ReactElement {
    const [selectedPlant, setSelectedPlant] = useState<string>('');
    const [selectedStorageLocation, setSelectedStorageLocation] = useState<string>('');
    const { plantsTable, storageLocationsTable } = useDataTable();
    const { poHeaders, isLoading, error, fetchPOHeaders } = usePurchaseOrder();
    const scrollY = useRef(new Animated.Value(0)).current;
    const listRef = useRef<FlatList>(null);

    const handlePlantChange = (plant: string) => {
        setSelectedPlant(plant);
        setSelectedStorageLocation('');
    };

    const handleStorageLocationChange = (location: string) => {
        setSelectedStorageLocation(location);
    };

    const handleSearch = () => {
        fetchPOHeaders(selectedPlant, selectedStorageLocation);
    };

    const handleScrollToTop = () => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    return (
        <View style={styles.container}>
            <SearchPanel
                showPlant={true}
                showStorageLocation={true}
                onPlantChange={handlePlantChange}
                onStorageLocationChange={handleStorageLocationChange}
                initialExpanded={true}
            />
            <View style={styles.actionContainer}>
                <Button title="Search" onPress={handleSearch} disabled={!selectedPlant} style={styles.searchButton} />
                <CountDisplay count={poHeaders.length} label="Purchase Orders" />
            </View>
            <HeaderList
                ref={listRef}
                data={poHeaders}
                isLoading={isLoading}
                error={error}
                scrollY={scrollY}
                onScrollToTop={handleScrollToTop}
            />
        </View>
    );
}
