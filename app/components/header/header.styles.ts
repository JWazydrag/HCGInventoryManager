import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@utils';

const HEADER_HEIGHT = 35;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 0.01,
            },
            web: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 2,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        color: colors.sap_belize,
    },
    leftText: {
        fontSize: 14,
        color: colors.darkGrey,
    },
});

export default styles;
