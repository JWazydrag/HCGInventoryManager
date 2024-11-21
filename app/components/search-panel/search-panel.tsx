import React, { ReactElement, useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from '../dropdown/dropdown';
import { useDataTable } from '@contexts/data-table-context';
import { colors } from '@utils';
import Text from '../text/text';
import styles from './search-panel.styles';
import { SearchPanelProps } from '@types';

export default function SearchPanel({
    showPlant = true,
    showStorageLocation = true,
    onPlantChange,
    onStorageLocationChange,
    initialExpanded = false,
}: SearchPanelProps): ReactElement {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [selectedPlant, setSelectedPlant] = useState<string>('');
    const [selectedStorageLocation, setSelectedStorageLocation] = useState<string>('');
    const { plantsTable, storageLocationsTable } = useDataTable();
    const animatedHeight = React.useRef(new Animated.Value(initialExpanded ? 1 : 0)).current;

    const plantItems = plantsTable.map((plant) => ({
        label: `${plant.Key} - ${plant.Value}`,
        value: plant.Key,
        key: plant.Key,
    }));

    const storageLocationItems = storageLocationsTable.map((location) => ({
        label: `${location.Key} - ${location.Value}`,
        value: location.Key,
        key: location.Key,
    }));

    const togglePanel = () => {
        Animated.spring(animatedHeight, {
            toValue: isExpanded ? 0 : 1,
            useNativeDriver: false,
        }).start();
        setIsExpanded(!isExpanded);
    };

    const handlePlantSelect = (plant: string) => {
        setSelectedPlant(plant);
        if (onPlantChange) {
            onPlantChange(plant);
        }
    };

    const handleStorageLocationSelect = (location: string) => {
        setSelectedStorageLocation(location);
        if (onStorageLocationChange) {
            onStorageLocationChange(location);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={togglePanel} style={styles.header}>
                <Text weight="700" style={styles.headerText}>
                    Search Filters
                </Text>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.sap_belize} />
            </TouchableOpacity>

            <Animated.View
                style={[
                    styles.content,
                    {
                        maxHeight: animatedHeight.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 200],
                        }),
                        opacity: animatedHeight,
                    },
                ]}
            >
                {showPlant && (
                    <View style={styles.field}>
                        <Dropdown
                            items={plantItems}
                            value={selectedPlant}
                            onValueChange={handlePlantSelect}
                            placeholder="Select Plant"
                            variant="outlined"
                            size="small"
                            searchable={true}
                        />
                    </View>
                )}

                {showStorageLocation && (
                    <View style={styles.field}>
                        <Dropdown
                            items={storageLocationItems}
                            value={selectedStorageLocation}
                            onValueChange={handleStorageLocationSelect}
                            placeholder="Select Storage Location"
                            variant="outlined"
                            size="small"
                            disabled={!selectedPlant}
                            searchable
                        />
                    </View>
                )}
            </Animated.View>
        </View>
    );
}
