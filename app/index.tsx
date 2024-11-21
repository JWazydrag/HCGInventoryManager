import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppBootstrap } from '@components';
import { Navigator } from './config';
import { AuthProvider } from '@contexts/auth-context';
import { NetworkProvider } from '@contexts/network-context';
import { ToastProvider } from '@contexts/toast-context';
import { DataTableProvider } from '@contexts/data-table-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PurchaseOrderProvider } from '@contexts/purchase-order-context';

export default function App(): ReactElement {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <AuthProvider>
                    <NetworkProvider>
                        <ToastProvider>
                            <DataTableProvider>
                                <PurchaseOrderProvider>
                                    <AppBootstrap>
                                        <Navigator />
                                    </AppBootstrap>
                                </PurchaseOrderProvider>
                            </DataTableProvider>
                        </ToastProvider>
                    </NetworkProvider>
                </AuthProvider>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
