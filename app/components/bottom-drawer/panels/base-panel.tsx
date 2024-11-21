import React, { ReactElement } from 'react';
import { View } from 'react-native';
import Text from '../../text/text'; // Direct import
import styles from './base-panel.styles';
import { BasePanelProps } from '@types';

export default function BasePanel({ children, title }: BasePanelProps): ReactElement {
    return (
        <View style={styles.container}>
            <Text weight="700" style={styles.title}>
                {title}
            </Text>
            {children}
        </View>
    );
}
