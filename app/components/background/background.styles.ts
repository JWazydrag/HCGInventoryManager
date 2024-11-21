import { StyleSheet } from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Variants
    solid: {
        backgroundColor: colors.lightGrey,
    },
    transparent: {
        backgroundColor: 'transparent',
    },
    // Padding variants
    paddingNone: {
        padding: 0,
    },
    paddingSmall: {
        padding: 10,
    },
    paddingMedium: {
        padding: 20,
    },
    paddingLarge: {
        padding: 30,
    },
});

export default styles;
