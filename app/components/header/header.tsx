import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../text/text';
import { colors } from '@utils';
import styles from './header.styles';
import { useNetwork } from '@contexts/network-context';
import { HeaderProps } from '@types';

export default function Header({ title, leftText, isVisible = true }: HeaderProps): ReactElement | null {
    const { isConnected, isInternetReachable } = useNetwork();

    if (!isVisible) return null;

    const getConnectionStatus = () => {
        if (!isConnected) return { icon: 'wifi', color: colors.loss };
        if (isInternetReachable === false) return { icon: 'warning', color: colors.draw };
        return { icon: 'wifi', color: colors.win };
    };

    const { icon, color } = getConnectionStatus();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {leftText && (
                    <Text weight="400" style={styles.leftText}>
                        {leftText}
                    </Text>
                )}
            </View>
            <View style={styles.centerContainer}>
                <Text weight="700" style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity
                    onPress={() => {
                        // Optional: Add network status details or refresh action
                    }}
                >
                    <Ionicons name={icon as any} size={24} color={color} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
