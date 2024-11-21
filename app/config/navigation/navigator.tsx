import React, { ReactElement, useState, useMemo } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Home, Login, POReceiving, PODetails } from '@screens';
import { colors } from '@utils';
import { useAuth } from '../../contexts/auth-context';
import { StackNavigatorParams } from '@types';

const Stack = createStackNavigator<StackNavigatorParams>();

const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    headerTintColor: colors.lightGreen,
    headerTitleStyle: {
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 20,
    },
    headerBackTitleStyle: {
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 14,
    },
};

export default function Navigator(): ReactElement {
    const { user } = useAuth();
    const [isNavigatorReady, setIsNavigatorReady] = useState(false);

    const screenOptions = useMemo(
        () => ({
            ...navigatorOptions,
            lazy: true,
        }),
        []
    );

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            {!user ? (
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                        cardStyle: { marginTop: 0 },
                    }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="POReceiving" component={POReceiving} options={{ headerShown: false }} />
                    <Stack.Screen name="PODetails" component={PODetails} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );
}
