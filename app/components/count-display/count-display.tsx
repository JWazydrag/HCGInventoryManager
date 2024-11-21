import React, { ReactElement } from 'react';
import { View } from 'react-native';
import Text from '../text/text';
import styles from './count-display.styles';
import { CountDisplayProps } from '@types';

export default function CountDisplay({ count, label = 'Items' }: CountDisplayProps): ReactElement {
    return (
        <View style={styles.container}>
            <Text weight="700" style={styles.count}>
                {count}
            </Text>
            <Text weight="400" style={styles.label}>
                {label}
            </Text>
        </View>
    );
}
