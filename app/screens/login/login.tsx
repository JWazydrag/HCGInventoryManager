import React, { ReactElement, useRef, useState } from 'react';
import { ScrollView, TextInput as NativeTextInput, Image } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginProps, StackNavigatorParams } from '@types';
import { RouteProp } from '@react-navigation/native';
import styles from './login.styles';
import { useAuth } from '@contexts/auth-context';
import { useToast } from '@contexts/toast-context';
import { useDataTable } from '@contexts/data-table-context';

export default function Login({ navigation }: LoginProps): ReactElement {
    const { setUser, authenticate, logout } = useAuth();
    const { showToast } = useToast();
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { fetchDataTable } = useDataTable();

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const login = async () => {
        if (!form.username || !form.password) {
            showToast('Please enter both username and password', 'warning');
            return;
        }

        try {
            const { username, password } = form;
            const authResult = await authenticate(username, password);

            if (authResult) {
                showToast('Login successful', 'success');
                await fetchDataTable();
                navigation.navigate('Home');
            } else {
                showToast('Invalid username or password', 'error');
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('401')) {
                    showToast('Invalid username or password', 'error');
                } else if (error.message.includes('403')) {
                    showToast('You are not authorized to access this resource', 'error');
                } else if (error.message.includes('404')) {
                    showToast('The requested resource was not found', 'error');
                } else {
                    showToast(error.message, 'error');
                }
            }
        }
    };

    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <TextInput
                    value={form.username}
                    onChangeText={(value) => setFormInput('username', value)}
                    returnKeyType="next"
                    placeholder="Username"
                    variant="outlined"
                    fullWidth
                    style={styles.inputContainer}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    error={!form.username}
                    errorText="Username is required"
                />
                <TextInput
                    value={form.password}
                    onChangeText={(value) => setFormInput('password', value)}
                    variant="outlined"
                    fullWidth
                    style={styles.inputContainer}
                    ref={passwordRef}
                    returnKeyType="done"
                    secureTextEntry
                    placeholder="Password"
                    error={!form.password}
                    errorText="Password is required"
                />
                <Button size="large" loading={loading} title="Login" onPress={login} fullWidth />
            </ScrollView>
        </GradientBackground>
    );
}
