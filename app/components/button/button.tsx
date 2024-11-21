import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, useWindowDimensions } from 'react-native';
import Text from '../text/text';
import styles from './button.styles';
import { ButtonProps } from '@types';

export default function Button({
    title,
    style,
    loading,
    variant = 'contained',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    ...props
}: ButtonProps): ReactElement {
    const { width } = useWindowDimensions();

    return (
        <TouchableOpacity
            disabled={loading || disabled}
            {...props}
            style={[
                styles.button,
                styles[variant],
                styles[size],
                fullWidth && width <= 768 && styles.fullWidth,
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'contained' ? '#fff' : '#000'} />
            ) : (
                <Text
                    weight="700"
                    style={[styles.buttonText, styles[`${variant}Text`], disabled && styles.disabledText]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
