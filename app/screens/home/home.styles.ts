import { colors } from '@utils';
import { StyleSheet, Platform, StatusBar } from 'react-native';

const HEADER_HEIGHT = 35;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
    container: {
        paddingTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
        alignItems: 'center',
        paddingVertical: 20,
    },
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 40,
    },
    logoutButton: {
        marginTop: 20,
        marginBottom: 10,
    },
    loggedInText: {
        color: colors.lightGreen,
        textAlign: 'center',
        fontSize: 12,
    },
});

export default styles;
