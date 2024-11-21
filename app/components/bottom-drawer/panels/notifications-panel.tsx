import React, { ReactElement } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../../text/text'; // Direct import
import BasePanel from './base-panel';
import { Ionicons } from '@expo/vector-icons';
import styles from './base-panel.styles';
import { colors } from '@utils';
import { Notification } from '@types';

const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Stock Update',
        message: 'New inventory items have been added',
        time: '5m ago',
        read: false,
    },
    {
        id: '2',
        title: 'System Maintenance',
        message: 'Scheduled maintenance in 2 hours',
        time: '1h ago',
        read: true,
    },
    // Add more mock notifications as needed
];

export default function NotificationsPanel(): ReactElement {
    return (
        <BasePanel title="Notifications">
            <ScrollView>
                {mockNotifications.map((notification) => (
                    <View
                        key={notification.id}
                        style={[styles.row, { backgroundColor: notification.read ? colors.white : colors.lightGrey2 }]}
                    >
                        <View style={{ flex: 1 }}>
                            <Text weight="700" style={styles.rowLabel}>
                                {notification.title}
                            </Text>
                            <Text weight="400" style={{ color: colors.darkGrey }}>
                                {notification.message}
                            </Text>
                            <Text weight="400" style={{ color: colors.darkGrey, fontSize: 12 }}>
                                {notification.time}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="close-outline" size={24} color={colors.darkGrey} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </BasePanel>
    );
}
