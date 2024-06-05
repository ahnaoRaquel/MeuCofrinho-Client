import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';


export default function SignIn({ navigation }) {
    const [text, onChangeText] = React.useState('text');
    return (
        <View className="flex-1 items-center justify-center bg-red-100 ">
            <Text className="m-8 text-2xl font-bold">Entrar</Text>


            <StyledTextInput value={text} onChangeText={onChangeText} label={"Email"} />
            <StyledTextInput value={text} onChangeText={onChangeText} label={"Senha"} />

            <StyledButton text={"Entrar"} onPress={() => navigation.navigate('HomeTabs', { screen: 'Home' })} />

            <Pressable
                onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-gray-600"> Não possui uma conta? Crie aqui</Text>
            </Pressable>

            <StatusBar style="auto" />
        </View>
    );
}
