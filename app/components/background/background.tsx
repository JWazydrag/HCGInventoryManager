import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './background.styles';
import { BackgroundProps } from '@types';

export default function Background({
    children,
    variant = 'solid',
    padding = 'none',
    backgroundColor,
    style,
    statusBarStyle = 'dark',
}: BackgroundProps): ReactElement {
    return (
        <View
            style={[
                styles.container,
                styles[variant],
                styles[`padding${padding.charAt(0).toUpperCase()}${padding.slice(1)}` as keyof typeof styles],
                backgroundColor ? { backgroundColor } : undefined,
                style,
            ]}
        >
            <StatusBar style={statusBarStyle} />
            {children}
        </View>
    );
}
