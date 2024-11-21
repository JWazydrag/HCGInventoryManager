import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '@utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: colors.white,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    iconButton: {
        padding: 10,
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        marginTop: 4,
        color: colors.sap_belize,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 60,
        backgroundColor: colors.white,
        padding: 20,
        height: height - 95,
        transform: [{ translateY: height - 60 }],
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.darkGrey,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 10,
    },
    activeIcon: {
        color: colors.lightPurple,
    },
});

export default styles;
