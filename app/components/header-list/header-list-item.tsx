import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../text/text';
import styles from './header-list.styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HeaderListItemProps, RootStackParamList } from '@types';

export default function HeaderListItem({ item, onPress }: HeaderListItemProps): ReactElement {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if ('Ebeln' in item) {
            navigation.navigate('PODetails', { po: item });
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';

        const msDateRegex = /\/Date\((\d+)\)\//;
        const match = dateString.match(msDateRegex);

        if (match) {
            const timestamp = parseInt(match[1], 10);
            return new Date(timestamp).toLocaleDateString();
        }

        return new Date(dateString).toLocaleDateString();
    };

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
            <View style={styles.itemContent}>
                <View style={styles.leftSection}>
                    <Text weight="700" style={styles.itemTitle}>
                        {item.Ebeln}
                    </Text>
                    <Text weight="400" style={styles.itemSubtitle}>
                        {item.Lifnr}
                    </Text>
                </View>
                <View style={styles.rightSection}>
                    <View style={styles.rightTextContainer}>
                        <Text weight="400" style={styles.dateText}>
                            {formatDate(item.Bedat)}
                        </Text>
                        <Text weight="400" style={styles.itemCount}>
                            Items: {item.ToItems?.results.length || 0}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
