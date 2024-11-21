import { AuthContextType, UserInfo } from '@types';
import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import entities from 'app/utils/entities';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticate = async (username: string, password: string): Promise<UserInfo | null> => {
        setLoading(true);
        setError(null);

        const BASE_URL = Platform.select({
            web: entities.SERVICE_URL,
            default: entities.SERVICE_HOST + entities.SERVICE_URL,
        });

        const SERVICE_URL = `${BASE_URL}/${entities.USER_ENTITY}`;
        const authHeader = 'Basic ' + btoa(`${username}:${password}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: authHeader,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                signal: controller.signal,
                credentials: 'include' as RequestCredentials,
            };

            const response = await fetch(SERVICE_URL, requestOptions);
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const isAuth = data.d?.results.length > 0;

            if (isAuth) {
                const userInfo = data.d?.results[0];
                const user = {
                    Arbpl: '',
                    IsAuth: userInfo.IsAuth,
                    Lgnum: userInfo.Lgnum,
                    Lgort: userInfo.Lgort,
                    Object: userInfo.Object,
                    Role: userInfo.Role,
                    Uname: userInfo.Uname,
                    username: userInfo.Uname,
                    Werks: userInfo.Werks,
                };

                await AsyncStorage.setItem('user', JSON.stringify(user));
                await AsyncStorage.setItem('authToken', authHeader);
                setUser(user);
                return user;
            }
            return null;
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    setError('The request took too long to respond');
                } else {
                    setError(error.message);
                }
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('authToken');
            setUser(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                error,
                authenticate,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
