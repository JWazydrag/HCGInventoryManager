import { StyleSheet, Platform } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    tile: {
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 5,
        marginTop: 20,
        minHeight: 56,
        ...Platform.select({
            web: {
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
            },
            android: {
                elevation: 3,
            },
            ios: {
                shadowColor: 'rgba(60, 64, 67, 0.3)',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
        }),
    },
    iconContainer: {
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    icon: {
        alignSelf: 'flex-start',
    },
    // Variants
    contained: {
        backgroundColor: colors.white,
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.sap_belize,
    },
    text: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    // Sizes
    small: {
        padding: 5,
        width: '80%',
        height: 30,
    },
    medium: {
        padding: 10,
        width: '90%',
        height: 40,
    },
    large: {
        padding: 15,
        width: '100%',
        height: 50,
    },
    // Width
    fullWidth: {
        width: '100%',
    },
    // States
    disabled: {
        backgroundColor: colors.lightGrey,
        borderColor: colors.darkGrey,
        opacity: 0.6,
    },
    // Text Styles
    tileText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    containedText: {
        color: colors.sap_belize,
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
    // Spacing
    spacingNone: {
        margin: 0,
    },
    spacingSmall: {
        margin: 5,
    },
    spacingMedium: {
        margin: 10,
    },
    spacingLarge: {
        margin: 15,
    },
});

export default styles;
