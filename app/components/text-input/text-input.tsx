import React, { ReactElement, forwardRef, useState } from 'react';
import {
    TextInput as NativeTextInput,
    TextInputProps as NativeTextInputProps,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    useWindowDimensions,
} from 'react-native';
import { colors } from '@utils';
import styles from './text-input.styles';
import { Ionicons } from '@expo/vector-icons';
import { TextInputProps } from '@types';

const TextInput = forwardRef<NativeTextInput, TextInputProps>(
    (
        {
            style,
            variant = 'outlined',
            size = 'medium',
            fullWidth = false,
            error = false,
            errorText,
            disabled = false,
            secureTextEntry,
            ...props
        }: TextInputProps,
        ref
    ): ReactElement => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);
        const { width } = useWindowDimensions();

        const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
        };

        return (
            <View style={[styles.container, style]}>
                <View
                    style={[
                        styles.inputWrapper,
                        styles[variant],
                        styles[size],
                        error && styles.error,
                        disabled && styles.disabled,
                    ]}
                >
                    <NativeTextInput
                        ref={ref}
                        placeholderTextColor={colors.darkGrey}
                        editable={!disabled}
                        style={[styles.input]}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                        {...props}
                    />
                    {secureTextEntry && (
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={togglePasswordVisibility}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color={colors.darkGrey}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {error && errorText && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                )}
            </View>
        );
    }
);

TextInput.displayName = 'TextInput';

export default TextInput;
