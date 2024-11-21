import { Platform, StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 10,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.2)',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    headerText: {
        fontSize: 16,
        color: colors.sap_belize,
    },
    content: {
        overflow: 'hidden',
        padding: 15,
    },
    field: {
        marginBottom: 15,
    },
});

export default styles;
