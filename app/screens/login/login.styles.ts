import { StyleSheet } from 'react-native';
import { globalStyles } from '@utils';

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 40,
        resizeMode: 'contain',
    },
    inputContainer: {
        marginBottom: 20,
    },
});

export default styles;
