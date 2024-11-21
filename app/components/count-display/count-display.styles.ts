import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.lightGrey2,
        borderRadius: 4,
        marginHorizontal: 10,
    },
    count: {
        fontSize: 16,
        color: colors.sap_belize,
        marginRight: 6,
    },
    label: {
        fontSize: 14,
        color: colors.darkGrey,
    },
});

export default styles;
