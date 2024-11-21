import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../text/text';
import BasePanel from './base-panel';
import { Ionicons } from '@expo/vector-icons';
import styles from './base-panel.styles';
import { colors } from '@utils';
import { useAuth } from '@contexts/auth-context';
import { useToast } from '@contexts/toast-context';
import { ProfilePanelProps } from '@types';

export default function ProfilePanel({ navigation }: ProfilePanelProps): ReactElement {
    const { user, logout } = useAuth();
    const { showToast } = useToast();

    const handleLogout = async () => {
        try {
            await logout();
            showToast('Successfully logged out', 'success');
        } catch (error) {
            showToast('Failed to logout properly', 'error');
        }
    };

    const menuItems = [{ icon: 'log-out-outline', label: 'Logout', onPress: handleLogout }];

    return (
        <BasePanel title="Profile">
            <View style={styles.section}>
                <View style={[styles.row, { borderBottomWidth: 2 }]}>
                    <View>
                        <Text weight="700" style={styles.rowLabel}>
                            {user?.username || 'User'}
                        </Text>
                        <Text weight="400" style={{ color: colors.darkGrey }}>
                            {user?.Role || 'Role not specified'}
                        </Text>
                    </View>
                    <Ionicons name="person-circle-outline" size={40} color={colors.sap_belize} />
                </View>
            </View>

            <View style={styles.section}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.row} onPress={item.onPress}>
                        <Text weight="400" style={styles.rowLabel}>
                            {item.label}
                        </Text>
                        <Ionicons
                            name={item.icon as keyof typeof Ionicons.glyphMap}
                            size={24}
                            color={colors.sap_belize}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </BasePanel>
    );
}
