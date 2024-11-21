import React, { ReactElement, forwardRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput as NativeTextInput,
    useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@utils';
import Text from '../text/text';
import styles from './dropdown.styles';
import { DropdownProps } from '@types';

const Dropdown = forwardRef<NativeTextInput, DropdownProps>(
    (
        {
            items,
            value,
            onValueChange,
            placeholder = 'Select an option',
            variant = 'outlined',
            size = 'medium',
            fullWidth = false,
            error = false,
            errorText,
            disabled = false,
            searchable = false,
        }: DropdownProps,
        ref
    ): ReactElement => {
        const [isOpen, setIsOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState('');
        const { width } = useWindowDimensions();

        const selectedItem = items.find((item) => item.value === value);

        const filteredItems = items.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

        const handleSelect = (selectedValue: string) => {
            if (onValueChange) {
                onValueChange(selectedValue);
            }
            setIsOpen(false);
            setSearchQuery('');
        };

        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    onPress={() => !disabled && setIsOpen(true)}
                    style={[
                        styles.inputWrapper,
                        styles[variant],
                        styles[size],
                        error && styles.error,
                        disabled && styles.disabled,
                    ]}
                >
                    <Text weight="400" style={[styles.selectedText, !selectedItem && styles.placeholder]}>
                        {selectedItem ? selectedItem.label : placeholder}
                    </Text>
                    <Ionicons name="chevron-down" size={24} color={colors.darkGrey} />
                </TouchableOpacity>

                <Modal visible={isOpen} transparent animationType="fade">
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
                        <View style={[styles.modalContent, { width: width > 768 ? '50%' : '90%' }]}>
                            {searchable && (
                                <View style={styles.searchContainer}>
                                    <NativeTextInput
                                        style={styles.searchInput}
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        placeholderTextColor={colors.darkGrey}
                                    />
                                </View>
                            )}
                            <ScrollView style={styles.itemsContainer}>
                                {filteredItems.map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={[styles.item, item.value === value && styles.selectedItem]}
                                        onPress={() => handleSelect(item.value)}
                                    >
                                        <Text
                                            weight="400"
                                            style={[styles.itemText, item.value === value && styles.selectedItemText]}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {error && errorText && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                )}
            </View>
        );
    }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
