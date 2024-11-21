import React, { ReactElement, forwardRef } from 'react';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import HeaderListItem from './header-list-item';
import styles from './header-list.styles';
import { colors } from '@utils';
import Text from '../text/text';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { HeaderListProps } from '@types';

const HeaderList = forwardRef<FlatList, HeaderListProps<any>>(
    (
        { data, isLoading = false, error = null, renderItem, keyExtractor, scrollY, onScrollToTop },
        ref
    ): ReactElement => {
        if (isLoading) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.sap_belize} />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.centerContainer}>
                    <Text weight="400" style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    renderItem={({ item }) => (renderItem ? renderItem(item) : <HeaderListItem item={item} />)}
                    keyExtractor={keyExtractor || ((item: any) => item.Ebeln || item.id)}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                        useNativeDriver: false,
                    })}
                />
                <ScrollToTop scrollY={scrollY} onPress={onScrollToTop} />
            </View>
        );
    }
);

export default HeaderList;
