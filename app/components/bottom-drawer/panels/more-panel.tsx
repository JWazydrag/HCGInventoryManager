import React, { ReactElement } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../../text/text'; // Direct import
import BasePanel from './base-panel';
import { Ionicons } from '@expo/vector-icons';
import styles from './base-panel.styles';
import { colors } from '@utils';

export default function MorePanel(): ReactElement {
    const menuSections = [
        {
            title: 'Inventory',
            items: [
                { icon: 'search-outline', label: 'Advanced Search' },
                { icon: 'bar-chart-outline', label: 'Reports' },
                { icon: 'print-outline', label: 'Print Labels' },
            ],
        },
        {
            title: 'System',
            items: [
                { icon: 'sync-outline', label: 'Sync Data' },
                { icon: 'cloud-download-outline', label: 'Download Updates' },
                { icon: 'information-circle-outline', label: 'About' },
            ],
        },
    ];

    return (
        <BasePanel title="More Options">
            <ScrollView>
                {menuSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text weight="400" style={styles.sectionTitle}>
                            {section.title}
                        </Text>

                        {section.items.map((item, itemIndex) => (
                            <TouchableOpacity key={itemIndex} style={styles.row}>
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
                ))}
            </ScrollView>
        </BasePanel>
    );
}
