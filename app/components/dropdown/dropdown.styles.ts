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
        justifyContent: 'space-between',
        width: width > 768 ? '50%' : '100%',
        maxWidth: 500,
        paddingHorizontal: 12,
    },
    selectedText: {
        flex: 1,
        color: colors.black,
        fontSize: 16,
    },
    placeholder: {
        color: colors.darkGrey,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 8,
        maxHeight: '80%',
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
        }),
    },
    searchContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        backgroundColor: colors.white,
    },
    searchInput: {
        height: 40,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
    },
    itemsContainer: {
        maxHeight: 300,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    selectedItem: {
        backgroundColor: colors.lightGrey2,
    },
    itemText: {
        fontSize: 16,
        color: colors.black,
    },
    selectedItemText: {
        color: colors.sap_belize,
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
    },
    medium: {
        height: 50,
    },
    large: {
        height: 60,
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
    },
});

export default styles;
