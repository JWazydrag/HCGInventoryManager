import { TextProps } from '@types';
import React, { ReactNode, ReactElement } from 'react';
import { Text as NativeText, TextProps as NativeTextProps } from 'react-native';

export default function Text({ children, style, weight = '700', ...props }: TextProps): ReactElement {
    let fontFamily;
    if (weight === '400') {
        fontFamily = 'RobotoCondensed_400Regular';
    }
    if (weight === '700') {
        fontFamily = 'RobotoCondensed_700Bold';
    }
    return (
        <NativeText {...props} style={[{ fontFamily }, style]}>
            {children}
        </NativeText>
    );
}
