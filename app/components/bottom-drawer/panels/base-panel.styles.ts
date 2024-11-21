import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        color: colors.sap_belize,
        marginBottom: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        color: colors.darkGrey,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    rowLabel: {
        fontSize: 16,
        color: colors.sap_belize,
    },
    iconButton: {
        padding: 8,
    },
});

export default styles;
