import { Platform, StatusBar, StyleSheet } from 'react-native';
import { colors } from '@utils';

const HEADER_HEIGHT = 35;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    poNumber: {
        fontSize: 20,
        color: colors.sap_belize,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: colors.darkGrey,
        marginBottom: 8,
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: colors.sap_belize,
    },
    tabText: {
        fontSize: 16,
        color: colors.darkGrey,
    },
    activeTabText: {
        color: colors.sap_belize,
    },
    content: {
        flex: 1,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        backgroundColor: colors.white,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemTitle: {
        flex: 1,
        fontSize: 16,
        color: colors.darkGrey,
        marginRight: 8,
    },
    itemQuantity: {
        fontSize: 16,
        color: colors.darkGrey,
    },
    itemDetails: {
        gap: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightSection: {
        width: 160,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    label: {
        fontSize: 14,
        color: colors.darkGrey,
        marginRight: 4,
    },
    value: {
        fontSize: 14,
        color: colors.darkGrey,
    },
    rightLabel: {
        fontSize: 14,
        color: colors.darkGrey,
        marginRight: 4,
    },
    rightValue: {
        fontSize: 14,
        color: colors.darkGrey,
        minWidth: 80,
        textAlign: 'right',
    },
    infoContainer: {
        padding: 16,
        backgroundColor: colors.white,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    infoLabel: {
        width: 100,
        fontSize: 14,
        color: colors.darkGrey,
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        color: colors.darkGrey,
    },
    listContainer: {
        flex: 1,
        position: 'relative',
    },
});

export default styles;
