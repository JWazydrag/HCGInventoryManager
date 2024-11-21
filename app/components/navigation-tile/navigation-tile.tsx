import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, TextStyle, View } from 'react-native';
import Text from '../text/text';
import styles from './navigation-tile.styles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@utils';
import { NavigationTileProps, TileSpacing } from '@types';

const getSpacingStyle = (spacing: TileSpacing): ViewStyle => {
    const spacingMap = {
        none: styles.spacingNone,
        small: styles.spacingSmall,
        medium: styles.spacingMedium,
        large: styles.spacingLarge,
    };
    return spacingMap[spacing] as ViewStyle;
};

export default function NavigationTile({
    title,
    style,
    variant = 'contained',
    size = 'medium',
    spacing = 'medium',
    fullWidth = false,
    disabled = false,
    tileStyle,
    textStyle,
    icon,
    iconSize = 24,
    iconColor = colors.sap_belize,
    ...props
}: NavigationTileProps): ReactElement {
    return (
        <TouchableOpacity
            disabled={disabled}
            {...props}
            style={[
                styles.tile,
                styles[variant] as ViewStyle,
                styles[size] as ViewStyle,
                getSpacingStyle(spacing),
                fullWidth && (styles.fullWidth as ViewStyle),
                disabled && (styles.disabled as ViewStyle),
                tileStyle,
                style,
            ]}
        >
            <View style={styles.iconContainer}>{icon && <Ionicons name={icon} size={20} color={iconColor} />}</View>
            <View style={styles.textContainer}>
                <Text
                    weight="700"
                    style={[
                        styles.tileText,
                        styles[`${variant}Text`] as TextStyle,
                        disabled && (styles.disabledText as TextStyle),
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
