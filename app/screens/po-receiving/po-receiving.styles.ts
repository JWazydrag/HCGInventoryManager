import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@utils';

const HEADER_HEIGHT = 35;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
    },
    content: {
        flex: 1,
        padding: 16,
        marginTop: 8,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    searchButton: {
        flex: 1,
        marginHorizontal: 10,
    },
});

export default styles;
