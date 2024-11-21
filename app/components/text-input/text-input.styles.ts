import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '@utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width > 768 ? '50%' : '100%',
        maxWidth: 500,
    },
    input: {
        flex: 1,
        fontFamily: 'RobotoCondensed_400Regular',
        color: colors.black,
    },
    eyeIcon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Variants
    outlined: {
        borderWidth: 1,
        borderColor: colors.sap_belize,
        backgroundColor: colors.white,
        borderRadius: 4,
    },
    filled: {
        backgroundColor: colors.lightGrey,
        borderWidth: 0,
        borderRadius: 4,
    },
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: colors.sap_belize,
        backgroundColor: 'transparent',
    },
    // Sizes
    small: {
        height: 40,
        paddingLeft: 12,
        fontSize: 14,
    },
    medium: {
        height: 50,
        paddingLeft: 16,
        fontSize: 16,
    },
    large: {
        height: 60,
        paddingLeft: 20,
        fontSize: 18,
    },
    // States
    disabled: {
        backgroundColor: colors.lightGrey,
        borderColor: colors.darkGrey,
        opacity: 0.6,
    },
    error: {
        borderColor: 'red',
    },
    errorContainer: {
        width: width > 768 ? '50%' : '100%',
        maxWidth: 500,
        alignItems: 'flex-start',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'RobotoCondensed_400Regular',
        alignSelf: 'flex-start',
    },
});

export default styles;
