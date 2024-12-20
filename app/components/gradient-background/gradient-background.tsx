import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@utils';
import { GradientBackgroundProps } from '@types';

export default function GradientBackground({ children }: GradientBackgroundProps): ReactElement {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <LinearGradient
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
                colors={[colors.lightGrey2, colors.lightGrey2]}
            />
            {children}
        </View>
    );
}
