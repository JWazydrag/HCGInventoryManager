import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useFonts, RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@contexts/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StatusBar } from 'react-native';
import Header from '../header/header';
import Background from '../background/background';
import BottomDrawer from '../bottom-drawer/bottom-drawer';
import SettingsPanel from '../bottom-drawer/panels/settings-panel';
import NotificationsPanel from '../bottom-drawer/panels/notifications-panel';
import ProfilePanel from '../bottom-drawer/panels/profile-panel';
import MorePanel from '../bottom-drawer/panels/more-panel';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppBootstrapProps, StackNavigatorParams } from '@types';

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement | null {
    const [fontLoaded] = useFonts({
        RobotoCondensed_400Regular,
        RobotoCondensed_700Bold,
    });
    const [authLoaded, setAuthLoaded] = useState(false);
    const { setUser, user } = useAuth();
    const navigation = useNavigation<StackNavigationProp<StackNavigatorParams>>();

    const isLoginScreen = !user;

    const drawerItems = [
        {
            id: 'settings',
            icon: 'settings' as const,
            label: 'Settings',
            panel: <SettingsPanel />,
        },
        {
            id: 'notifications',
            icon: 'notifications-outline' as const,
            label: 'Notifications',
            panel: <NotificationsPanel />,
        },
        {
            id: 'profile',
            icon: 'person-outline' as const,
            label: 'Profile',
            panel: <ProfilePanel navigation={navigation} />,
        },
        {
            id: 'more',
            icon: 'menu-outline' as const,
            label: 'More',
            panel: <MorePanel />,
        },
    ];

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                const userString = await AsyncStorage.getItem('user');
                const user = userString ? JSON.parse(userString) : null;
                setUser(user);
                setAuthLoaded(true);
            } catch (error) {
                setUser(null);
                setAuthLoaded(true);
            }
        }
        prepare();
    }, [setUser]);

    useEffect(() => {
        if (fontLoaded && authLoaded) {
            SplashScreen.hideAsync().catch(console.warn);
        }
    }, [fontLoaded, authLoaded]);

    if (!fontLoaded || !authLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <Background>
                {!isLoginScreen && <Header leftText="HS4" title="HCG UI5 MI4" isVisible={true} />}
                {children}
                {!isLoginScreen && <BottomDrawer showBackButton={true} items={drawerItems} navigation={navigation} />}
            </Background>
        </View>
    );
}
