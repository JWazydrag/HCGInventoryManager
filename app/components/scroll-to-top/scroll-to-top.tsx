import React, { ReactElement, useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './scroll-to-top.styles';
import { colors } from '@utils';
import { ScrollToTopProps } from '@types';

export default function ScrollToTop({ scrollY, onPress, threshold = 200 }: ScrollToTopProps): ReactElement | null {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            setIsVisible(value > threshold);
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY, threshold]);

    if (!isVisible) return null;

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <Ionicons name="arrow-up" size={24} color={colors.white} />
        </TouchableOpacity>
    );
}
