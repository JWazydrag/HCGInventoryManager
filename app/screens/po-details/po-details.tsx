import React, { ReactElement, useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, FlatList } from 'react-native';
import { PODetailsProps, POItem, PurchaseOrder, POReceipt, POReturn, Tab } from '@types';
import { HeaderList, ScrollToTop, Text } from '@components';
import styles from './po-details.styles';

export default function PODetails({ route }: PODetailsProps): ReactElement {
    const [activeTab, setActiveTab] = useState<Tab>('items');
    const po: PurchaseOrder = route.params.po;

    const renderTabContent = () => {
        const scrollY = useRef(new Animated.Value(0)).current;
        const flatListRef = useRef<FlatList>(null);

        const handleScrollToTop = () => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        };

        switch (activeTab) {
            case 'items':
                return (
                    <View style={styles.listContainer}>
                        <HeaderList
                            ref={flatListRef}
                            data={po.ToItems.results}
                            keyExtractor={(item) => `${item.Ebeln}-${item.Ebelp}`}
                            renderItem={renderItemContent}
                            scrollY={scrollY}
                            onScrollToTop={handleScrollToTop}
                        />
                        <ScrollToTop scrollY={scrollY} onPress={handleScrollToTop} />
                    </View>
                );
            case 'receipts':
                return (
                    <View style={styles.listContainer}>
                        <HeaderList
                            ref={flatListRef}
                            data={po.ToReceipts.results}
                            keyExtractor={(item) => `${item.Ebeln}-${item.Ebelp}-${item.Belnr}-${item.Buzei}`}
                            renderItem={renderReceiptContent}
                            scrollY={scrollY}
                            onScrollToTop={handleScrollToTop}
                        />
                        <ScrollToTop scrollY={scrollY} onPress={handleScrollToTop} />
                    </View>
                );
            case 'returns':
                return (
                    <View style={styles.listContainer}>
                        <HeaderList
                            ref={flatListRef}
                            data={po.ToReturns.results}
                            keyExtractor={(item) => `${item.Ebeln}-${item.Ebelp}-${item.Belnr}-${item.Buzei}`}
                            renderItem={renderReturnContent}
                            scrollY={scrollY}
                            onScrollToTop={handleScrollToTop}
                        />
                        <ScrollToTop scrollY={scrollY} onPress={handleScrollToTop} />
                    </View>
                );
            case 'info':
                return renderInfoContent(po);
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text weight="700" style={styles.poNumber}>
                    PO: {po.Ebeln}
                </Text>
                <Text weight="400" style={styles.description}>
                    {po.Description}
                </Text>
            </View>

            <View style={styles.tabs}>
                <TabButton
                    title="Items"
                    active={activeTab === 'items'}
                    onPress={() => setActiveTab('items')}
                    count={po.ToItems.results.length}
                />
                <TabButton
                    title="Receipts"
                    active={activeTab === 'receipts'}
                    onPress={() => setActiveTab('receipts')}
                    count={po.ToReceipts.results.length}
                />
                <TabButton
                    title="Returns"
                    active={activeTab === 'returns'}
                    onPress={() => setActiveTab('returns')}
                    count={po.ToReturns.results.length}
                />
                <TabButton title="Info" active={activeTab === 'info'} onPress={() => setActiveTab('info')} count={1} />
            </View>

            <View style={styles.content}>{renderTabContent()}</View>
        </View>
    );
}

type TabButtonProps = {
    title: string;
    active: boolean;
    onPress: () => void;
    count: number;
};

function TabButton({ title, active, onPress, count }: TabButtonProps) {
    return (
        <TouchableOpacity style={[styles.tabButton, active && styles.activeTabButton]} onPress={onPress}>
            <Text weight="400" style={[styles.tabText, active && styles.activeTabText]}>
                {title} ({count})
            </Text>
        </TouchableOpacity>
    );
}

const renderItemContent = (item: POItem) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text weight="700" style={styles.itemTitle}>
                    {item.Matnr} - {item.Maktx}
                </Text>
                <Text weight="700" style={styles.itemQuantity}>
                    {item.Menge} {item.Meins}
                </Text>
            </View>

            <View style={styles.itemDetails}>
                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Line:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.Ebelp}
                        </Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Text weight="400" style={styles.rightLabel}>
                            Receive:{' '}
                        </Text>
                        <Text weight="400" style={styles.rightValue}>
                            {item.ReceivedQty || '0.000'}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            SLoc:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.Lgort}
                        </Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Text weight="400" style={styles.rightLabel}>
                            Order Qty:{' '}
                        </Text>
                        <Text weight="400" style={styles.rightValue}>
                            {item.Menge} {item.Meins}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Batch:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.Charg || ''}
                        </Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Text weight="400" style={styles.rightLabel}>
                            Serial
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Mfg Part #:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.MfgPart || ''}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Vendor Part #:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.VendorPart || ''}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const renderReceiptContent = (item: POReceipt) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';

        const msDateRegex = /\/Date\((\d+)\)\//;
        const match = dateString.match(msDateRegex);

        if (match) {
            const timestamp = parseInt(match[1], 10);
            return new Date(timestamp).toLocaleDateString();
        }

        return new Date(dateString).toLocaleDateString();
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text weight="700" style={styles.itemTitle}>
                    {item.Belnr}
                </Text>
                <Text weight="700" style={styles.itemQuantity}>
                    {item.Menge} {item.Meins}
                </Text>
            </View>

            <View style={styles.itemDetails}>
                <Text weight="400" style={styles.description}>
                    {item.Matnr} - {item.Maktx}
                </Text>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Mvmt Type:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.MvmtType}
                        </Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Text weight="400" style={styles.rightLabel}>
                            Posted:{' '}
                        </Text>
                        <Text weight="400" style={styles.rightValue}>
                            {item.PostedBy}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Date:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {formatDate(item.Budat)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const renderReturnContent = (item: POReturn) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';

        const msDateRegex = /\/Date\((\d+)\)\//;
        const match = dateString.match(msDateRegex);

        if (match) {
            const timestamp = parseInt(match[1], 10);
            return new Date(timestamp).toLocaleDateString();
        }

        return new Date(dateString).toLocaleDateString();
    };
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text weight="700" style={styles.itemTitle}>
                    {item.Belnr}
                </Text>
                <Text weight="700" style={styles.itemQuantity}>
                    {item.Menge} {item.Meins}
                </Text>
            </View>

            <View style={styles.itemDetails}>
                <Text weight="400" style={styles.description}>
                    {item.Matnr} - {item.Maktx}
                </Text>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Mvmt:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {item.MvmtType}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.leftSection}>
                        <Text weight="400" style={styles.label}>
                            Date:{' '}
                        </Text>
                        <Text weight="400" style={styles.value}>
                            {formatDate(item.Budat)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const renderInfoContent = (po: PurchaseOrder) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';

        const msDateRegex = /\/Date\((\d+)\)\//;
        const match = dateString.match(msDateRegex);

        if (match) {
            const timestamp = parseInt(match[1], 10);
            return new Date(timestamp).toLocaleDateString();
        }

        return new Date(dateString).toLocaleDateString();
    };
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
                <Text weight="400" style={styles.infoLabel}>
                    Type:
                </Text>
                <Text weight="400" style={styles.infoValue}>
                    {po.Bsart}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text weight="400" style={styles.infoLabel}>
                    Company:
                </Text>
                <Text weight="400" style={styles.infoValue}>
                    {po.Bukrs}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text weight="400" style={styles.infoLabel}>
                    Vendor:
                </Text>
                <Text weight="400" style={styles.infoValue}>
                    {po.Lifnr}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text weight="400" style={styles.infoLabel}>
                    Name:
                </Text>
                <Text weight="400" style={styles.infoValue}>
                    {po.VendorName}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text weight="400" style={styles.infoLabel}>
                    Doc Date:
                </Text>
                <Text weight="400" style={styles.infoValue}>
                    {formatDate(po.Bedat)}
                </Text>
            </View>
        </View>
    );
};
