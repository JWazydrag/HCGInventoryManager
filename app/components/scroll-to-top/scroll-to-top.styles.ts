import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.sap_belize,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
});

export default styles;
