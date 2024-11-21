import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@utils';

const HEADER_HEIGHT = 35;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: HEADER_HEIGHT + STATUSBAR_HEIGHT + 10,
        left: 20,
        right: 20,
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    message: {
        flex: 1,
        fontSize: 14,
        color: colors.sap_belize,
    },
    success: {
        borderLeftWidth: 4,
        borderLeftColor: colors.win,
    },
    error: {
        borderLeftWidth: 4,
        borderLeftColor: colors.loss,
    },
    warning: {
        borderLeftWidth: 4,
        borderLeftColor: colors.draw,
    },
    info: {
        borderLeftWidth: 4,
        borderLeftColor: colors.sap_belize,
    },
});

export default styles;
