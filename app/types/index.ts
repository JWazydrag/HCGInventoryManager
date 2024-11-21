import { ReactElement, ReactNode } from 'react';
import {
    Animated,
    FlatList,
    TextInputProps as NativeTextInputProps,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Navigation Types
export type StackNavigatorParams = {
    Home: undefined;
    Login: { redirect: keyof StackNavigatorParams } | undefined;
    POReceiving: undefined;
    PODetails: { po: PurchaseOrder };
};
export type ProfilePanelProps = {
    navigation: StackNavigationProp<StackNavigatorParams>;
};
export type BackgroundVariant = 'solid' | 'transparent';
export type PaddingSize = 'none' | 'small' | 'medium' | 'large';
export type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
};
export type BackgroundProps = {
    children: ReactNode;
    variant?: BackgroundVariant;
    padding?: PaddingSize;
    backgroundColor?: string;
    style?: ViewStyle;
    statusBarStyle?: 'light' | 'dark' | 'auto';
};
export type AppBootstrapProps = {
    children: ReactNode;
};
// Component Props Types
export type TextProps = {
    weight?: '400' | '700';
    children: ReactNode;
} & NativeTextInputProps;

export type BottomDrawerItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    panel: ReactNode;
};

export type BottomDrawerProps = {
    items: BottomDrawerItem[];
    navigation: StackNavigationProp<StackNavigatorParams>;
    showBackButton?: boolean;
};

export type DropdownItem = {
    label: string;
    value: string;
};

export type BasePanelProps = {
    children: ReactNode;
    title: string;
};

// Context Types
export type AuthContextType = {
    user: UserInfo | null;
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    loading: boolean;
    error: string | null;
    authenticate: (username: string, password: string) => Promise<UserInfo | null>;
    logout: () => Promise<void>;
};

export type ToastContextType = {
    showToast: (message: string, type: ToastType) => void;
};

export type DataTableContextType = {
    plantsTable: DataTableItem[];
    storageLocationsTable: DataTableItem[];
    imStorageLocationsTable: DataTableItem[];
    wmStorageLocationsTable: DataTableItem[];
    movementTypesTable: DataTableItem[];
    stockTypesTable: DataTableItem[];
    specialIndicatorsTable: DataTableItem[];
    warehousesTable: DataTableItem[];
    ewmWarehousesTable: DataTableItem[];
    storageTypesTable: DataTableItem[];
    ewmStorageTypesTable: DataTableItem[];
    storageUnitTypesTable: DataTableItem[];
    differenceIndicatorsTable: DataTableItem[];
    stockCategoriesTable: DataTableItem[];
    ewmActivityAreasTable: DataTableItem[];
    queuesTable: DataTableItem[];
    isLoading: boolean;
    error: string | null;
    fetchDataTable: () => Promise<void>;
};

// Data Types
export type DataTableItem = {
    Type: string;
    [key: string]: any;
};

export type POItem = {
    Ebeln: string;
    Ebelp: string;
    Matnr: string;
    Maktx: string;
    Menge: string;
    Meins: string;
    Lgort: string;
    ReceivedQty: string;
    Charg: string;
    MfgPart: string;
    VendorPart: string;
    Budat: string;
};

export type POReceipt = {
    Ebeln: string;
    Ebelp: string;
    Belnr: string;
    Buzei: string;
    Matnr: string;
    Maktx: string;
    Menge: string;
    Meins: string;
    MvmtType: string;
    PostedBy: string;
    PostedDate: string;
    Budat: string;
};

export type POReturn = {
    Ebeln: string;
    Ebelp: string;
    Belnr: string;
    Buzei: string;
    Matnr: string;
    Maktx: string;
    Menge: string;
    Meins: string;
    MvmtType: string;
    PostedDate: string;
    Budat: string;
};

export type PurchaseOrder = {
    Aedat: string;
    Bedat: string;
    Bsart: string;
    Bukrs: string;
    Description: string;
    Ebeln: string;
    Ekgrp: string;
    Ekorg: string;
    Lifnr: string;
    Werks: string;
    VendorName: string;
    ToItems: {
        results: POItem[];
    };
    ToReceipts: {
        results: POReceipt[];
    };
    ToReturns: {
        results: POReturn[];
    };
};
export type PODetailsProps = {
    route: RouteProp<StackNavigatorParams, 'PODetails'>;
};
export type UserInfo = {
    Arbpl: string;
    IsAuth: boolean;
    Lgnum: string;
    Lgort: string;
    Object: string;
    Role: string;
    Uname: string;
    username: string;
    Werks: string;
};
export type Tab = 'items' | 'receipts' | 'returns' | 'info';
// UI Types
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type TextInputVariant = 'outlined' | 'filled' | 'underlined';
export type TextInputSize = 'small' | 'medium' | 'large';
export type DropdownVariant = 'outlined' | 'filled' | 'underlined';
export type DropdownSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
    title: string;
    loading?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    disabled?: boolean;
} & TouchableOpacityProps;

export type CountDisplayProps = {
    count: number;
    label?: string;
};
export type DropdownProps = {
    items: DropdownItem[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    variant?: DropdownVariant;
    size?: DropdownSize;
    fullWidth?: boolean;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
    searchable?: boolean;
};
export type GradientBackgroundProps = {
    children: ReactNode;
};
export type HeaderProps = {
    title: string;
    leftText?: string;
    isVisible?: boolean;
};
export type HeaderListItemProps = {
    item: any;
    onPress?: () => void;
};

export type RootStackParamList = {
    PODetails: { po: any };
};
export type HeaderListProps<T> = {
    data: T[];
    isLoading?: boolean;
    error?: string | null;
    renderItem?: (item: T) => ReactElement;
    keyExtractor?: (item: T) => string;
    scrollY: Animated.Value;
    onScrollToTop: () => void;
};

export type TileVariant = 'contained' | 'outlined' | 'text';
export type TileSize = 'small' | 'medium' | 'large';
export type TileSpacing = 'none' | 'small' | 'medium' | 'large';

export type NavigationTileProps = {
    title: string;
    variant?: TileVariant;
    size?: TileSize;
    spacing?: TileSpacing;
    fullWidth?: boolean;
    disabled?: boolean;
    tileStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    iconColor?: string;
} & TouchableOpacityProps;

export type SearchPanelProps = {
    showPlant?: boolean;
    showStorageLocation?: boolean;
    onPlantChange?: (plant: string) => void;
    onStorageLocationChange?: (storageLocation: string) => void;
    initialExpanded?: boolean;
};

export type TextInputProps = {
    variant?: TextInputVariant;
    size?: TextInputSize;
    fullWidth?: boolean;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
} & NativeTextInputProps;

export type ToastProps = {
    message: string;
    type: ToastType;
    visible: boolean;
    onHide: () => void;
};

export type NetworkContextType = {
    isConnected: boolean;
    isInternetReachable: boolean | null;
};
export type POHeader = {
    Ebeln: string;
    // Add other PO header fields as needed
};

export type PurchaseOrderContextType = {
    poHeaders: POHeader[];
    isLoading: boolean;
    error: string | null;
    fetchPOHeaders: (plant?: string, storageLocation?: string) => Promise<void>;
};
export type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, 'Home'>;
};

export type NavigationItem = {
    title: string;
    route: keyof StackNavigatorParams;
    icon?: string;
};
export type LoginProps = {
    navigation: StackNavigationProp<StackNavigatorParams, 'Login'>;
    route: RouteProp<StackNavigatorParams, 'Login'>;
};
export type ScrollToTopProps = {
    scrollY: Animated.Value;
    onPress: () => void;
    threshold?: number;
};
