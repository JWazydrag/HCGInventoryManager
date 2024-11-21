import React, { ReactElement } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationTile } from '@components';
import { navigationItems } from '@config/navigation/navigation-items';
import styles from './home.styles';
import { HomeProps, NavigationItem, StackNavigatorParams } from '@types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@utils';

export default function Home({ navigation }: HomeProps): ReactElement {
    const handleNavigation = (route: keyof StackNavigatorParams) => {
        switch (route) {
            case 'PODetails':
                // Skip navigation since PODetails requires a PO parameter
                return;
            case 'Login':
                navigation.navigate('Login', { redirect: 'Home' });
                break;
            default:
                navigation.navigate(route);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.tilesContainer}>
                {(navigationItems as NavigationItem[]).map((item: NavigationItem, index) => (
                    <NavigationTile
                        key={index}
                        title={item.title}
                        spacing="small"
                        icon={item.icon as keyof typeof Ionicons.glyphMap}
                        iconSize={24}
                        iconColor={colors.sap_belize}
                        onPress={() => handleNavigation(item.route)}
                    />
                ))}
            </View>
        </ScrollView>
    );
}
