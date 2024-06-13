import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import { useAuth } from '../lib/AuthProvider'
import { authenticate } from '../lib/Auth'
import * as SecureStore from 'expo-secure-store';


export default function SignIn({ navigation }) {
    const [username, setUsername] = React.useState('luffy@gmail.com');
    const [password, setPassword] = React.useState('essaeasenha1');
    const { token, setToken } = useAuth();



    const handleClickEntrar = async (e) => {
        try {
            console.log("try to login")
            const response = await authenticate(username, password);
            setToken(response.token);
            await SecureStore.setItemAsync("usuario", response.usuario);
            await SecureStore.setItemAsync("token", response.token);
            console.log(`usuario: ${response.usuario}`);
            console.log(`token: ${response.token}`);
            navigation.navigate('HomeTabs', { screen: 'Home' });
        } catch (error) {
            console.log('Erro ao autenticar:', error);
        }
    }


    return (
        <View className="flex-1 items-center justify-center bg-red-100 ">
            <Text className="m-8 text-2xl font-bold">Entrar</Text>


            <StyledTextInput value={username} onChangeText={setUsername} label={"Email"} />
            <StyledTextInput value={password} onChangeText={setPassword} label={"Senha"} />

            <StyledButton text={"Entrar"} onPress={handleClickEntrar} />
            {/* <StyledButton text={"Entrar"} onPress={() => navigation.navigate('HomeTabs', { screen: 'Home' })} /> */}

            <Pressable
                onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-gray-600"> Não possui uma conta? Crie aqui</Text>
            </Pressable>

            <StatusBar style="auto" />
        </View >
    );
}
