import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '@utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
            },
            default: {},
        }),
    },
    // Variants
    contained: {
        backgroundColor: colors.sap_belize,
        ...Platform.select({
            web: {
                boxShadow: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
            },
            default: {
                elevation: 2,
            },
        }),
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.sap_belize,
    },
    text: {
        backgroundColor: 'transparent',
    },
    // Sizes
    small: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        minWidth: 64,
        width: width > 768 ? '50%' : '100%',
        maxWidth: 300,
    },
    medium: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        minWidth: 96,
        width: width > 768 ? '50%' : '100%',
        maxWidth: 400,
    },
    large: {
        paddingVertical: 10,
        paddingHorizontal: 32,
        minWidth: 128,
        width: width > 768 ? '50%' : '100%',
        maxWidth: 500,
    },
    // Width
    fullWidth: {
        width: '100%',
        maxWidth: width > 768 ? '50%' : '100%',
    },
    // States
    disabled: {
        backgroundColor: colors.darkGrey,
        borderColor: colors.darkGrey,
        opacity: 0.6,
    },
    // Text Styles
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    containedText: {
        color: colors.white,
    },
    outlinedText: {
        color: colors.sap_belize,
    },
    textText: {
        color: colors.sap_belize,
    },
    disabledText: {
        color: colors.darkGrey,
    },
});

export default styles;
