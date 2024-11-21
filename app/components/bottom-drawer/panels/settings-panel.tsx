import React, { ReactElement } from 'react';
import { View, Switch } from 'react-native';
import Text from '../../text/text';
import BasePanel from './base-panel';
import styles from './base-panel.styles';
import { colors } from '@utils';

export default function SettingsPanel(): ReactElement {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [offline, setOffline] = React.useState(false);

    return (
        <BasePanel title="Settings">
            <View style={styles.section}>
                <Text weight="400" style={styles.sectionTitle}>
                    App Preferences
                </Text>

                <View style={styles.row}>
                    <Text weight="400" style={styles.rowLabel}>
                        Notifications
                    </Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: colors.lightGrey, true: colors.lightPurple }}
                    />
                </View>

                <View style={styles.row}>
                    <Text weight="400" style={styles.rowLabel}>
                        Dark Mode
                    </Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: colors.lightGrey, true: colors.lightPurple }}
                    />
                </View>

                <View style={styles.row}>
                    <Text weight="400" style={styles.rowLabel}>
                        Offline Mode
                    </Text>
                    <Switch
                        value={offline}
                        onValueChange={setOffline}
                        trackColor={{ false: colors.lightGrey, true: colors.lightPurple }}
                    />
                </View>
            </View>
        </BasePanel>
    );
}
