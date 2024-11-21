import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react';
import Toast, { ToastType } from '../components/toast/toast';
import { ToastContextType } from '@types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast(): ToastContextType {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }): ReactElement {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('info');

    const showToast = (msg: string, toastType: ToastType) => {
        setMessage(msg);
        setType(toastType);
        setVisible(true);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast visible={visible} message={message} type={type} onHide={() => setVisible(false)} />
        </ToastContext.Provider>
    );
}
