import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';

export default function SignUp({ navigation }) {
    const [text, onChangeText] = React.useState('text');
    const [textDtNasc, onChangeTextDtNasc] = React.useState('dd/mm/aaaa');
    return (
        <View className="flex-1 items-center justify-center bg-red-100 ">
            <Text className="m-8 text-2xl font-bold">Criar Conta</Text>


            <StyledTextInput value={text} onChangeText={onChangeText} label={"Nome"} />
            <StyledTextInput value={text} onChangeText={onChangeText} label={"Email"} />
            <StyledTextInput value={textDtNasc} onChangeText={onChangeTextDtNasc} label={"Data de Nascimento"} />
            <StyledTextInput value={text} onChangeText={onChangeText} label={"Senha"} />
            <StyledTextInput value={text} onChangeText={onChangeText} label={"Confirmar Senha"} />

            <StyledButton text={"Criar"} onPress={() => navigation.navigate('SignIn')} />

            <StatusBar style="auto" />
        </View>
    );
}
