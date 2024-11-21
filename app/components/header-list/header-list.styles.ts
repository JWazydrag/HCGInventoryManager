import { StyleSheet, Platform } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
        marginBottom: 50,
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: colors.loss,
        textAlign: 'center',
        fontSize: 16,
    },
    itemContainer: {
        backgroundColor: colors.white,
        borderRadius: 8,
        marginVertical: 6,
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
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    leftSection: {
        flex: 1,
        marginRight: 16,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    rightTextContainer: {
        alignItems: 'flex-end',
    },
    itemTitle: {
        fontSize: 16,
        color: colors.sap_belize,
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 14,
        color: colors.darkGrey,
    },
    dateText: {
        fontSize: 14,
        color: colors.darkGrey,
        marginBottom: 4,
    },
    itemCount: {
        fontSize: 14,
        color: colors.darkGrey,
    },
    container: {
        flex: 1,
        position: 'relative',
    },
});

export default styles;
