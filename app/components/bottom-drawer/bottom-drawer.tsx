import React, { ReactElement, ReactNode, useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../text/text';
import styles from './bottom-drawer.styles';
import { colors } from '@utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParams } from '@types';

export type BottomDrawerItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    panel: ReactNode;
};

type BottomDrawerProps = {
    items: BottomDrawerItem[];
    navigation: StackNavigationProp<StackNavigatorParams>;
    showBackButton?: boolean;
};

export default function BottomDrawer({ items, navigation, showBackButton = false }: BottomDrawerProps): ReactElement {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const drawerAnim = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const height = Dimensions.get('window').height;

    const closeDrawer = () => {
        Animated.spring(drawerAnim, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
        setActiveItem(null);
    };

    const openDrawer = (itemId: string) => {
        Animated.spring(drawerAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
        }).start();
        setActiveItem(itemId);
    };

    const toggleDrawer = (itemId: string) => {
        if (activeItem === itemId) {
            closeDrawer();
        } else {
            openDrawer(itemId);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.drawer,
                    {
                        transform: [
                            {
                                translateY: drawerAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [height, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                {activeItem &&
                    React.cloneElement(items.find((item) => item.id === activeItem)?.panel as React.ReactElement, {
                        navigation,
                    })}
            </Animated.View>

            <View style={styles.buttonBar}>
                {showBackButton && (
                    <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
                        <Ionicons name="arrow-back" size={24} color={colors.sap_belize} />
                        <Text weight="400" style={styles.iconText}>
                            Back
                        </Text>
                    </TouchableOpacity>
                )}
                {items.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.iconButton} onPress={() => toggleDrawer(item.id)}>
                        <Ionicons
                            name={item.icon}
                            size={24}
                            color={activeItem === item.id ? colors.lightPurple : colors.sap_belize}
                        />
                        <Text weight="400" style={[styles.iconText, activeItem === item.id && styles.activeIcon]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
