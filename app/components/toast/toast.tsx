import React, { ReactElement } from 'react';
import { Animated, View } from 'react-native';
import Text from '../text/text';
import { Ionicons } from '@expo/vector-icons';
import styles from './toast.styles';
import { colors } from '@utils';
import { ToastProps } from '@types';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

const getToastIcon = (type: ToastType) => {
    switch (type) {
        case 'success':
            return { name: 'checkmark-circle', color: colors.win };
        case 'error':
            return { name: 'alert-circle', color: colors.loss };
        case 'warning':
            return { name: 'warning', color: colors.draw };
        case 'info':
            return { name: 'information-circle', color: colors.sap_belize };
    }
};

export default function Toast({ message, type, visible, onHide }: ToastProps): ReactElement | null {
    const [animation] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => onHide());
        }
    }, [visible]);

    if (!visible) return null;

    const icon = getToastIcon(type);

    return (
        <Animated.View
            style={[
                styles.container,
                styles[type],
                {
                    opacity: animation,
                    transform: [
                        {
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-20, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <View style={styles.content}>
                <Ionicons name={icon.name as any} size={24} color={icon.color} style={styles.icon} />
                <Text weight="400" style={styles.message}>
                    {message}
                </Text>
            </View>
        </Animated.View>
    );
}
