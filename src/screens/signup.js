import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Text, View, Platform } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import configureAxios from '../lib/RequestInterceptor';

export default function SignUp({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [textDtNasc, setTextDtNasc] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [respostaOk, setRespostaOk] = useState(false);
    const [respostaErro, setRespostaErro] = useState(null);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); 
        setDate(currentDate);
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        setTextDtNasc(formattedDate);
    };

    const criarConta = async () => {
        if (senha !== confirmaSenha) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        const dados = {
            nome,
            username: email,
            dataNascimento: textDtNasc,
            password: senha
        };

        console.log('Dados a serem enviados:', dados);

        try {
            console.log("try")
            const response = await fetch('http://localhost:8080/usuarios/salvar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
                timeout: 10000,
            });
            console.log("done try")
            if (response.ok) {
                const data = await response.json();
                console.log('Resposta do servidor:', data);
                Alert.alert('Usuário cadastrado com successo');
                navigation.navigate('SignIn');
            } else {
                console.log('Erro na resposta:', response.status, response.statusText);
                const errorData = await response.json(); // Se houver mensagem de erro detalhada do servidor
                setRespostaErro(errorData.errors || errorData.message || 'Erro desconhecido');
                Alert.alert('Erro', errorData.errors || errorData.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao criar conta:', error);
            Alert.alert('Erro', 'Erro ao criar conta');
        }
    };


    return (
        respostaOk ? (
            <View className="flex-1 items-center justify-center bg-red-100">
                <Text className="m-8 text-2xl font-bold">Conta criada com sucesso</Text>
            </View>
        ) : (
            <View className="flex-1 items-center justify-center bg-red-100">
                <Text className="m-8 text-2xl font-bold">Criar Conta</Text>

                <StyledTextInput value={nome} onChangeText={setNome} label="Nome" />
                <StyledTextInput value={email} onChangeText={setEmail} label="Email" />

                <View className="text-start items-start bg-red-100 mx-3">
                    <Text className="m-3">Data de Nascimento</Text>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                    <StyledButton text="Selecionar Data" onPress={() => setShowDatePicker(true)} />
                </View>

                <StyledTextInput value={senha} onChangeText={setSenha} label="Senha" secureTextEntry />
                <StyledTextInput value={confirmaSenha} onChangeText={setConfirmaSenha} label="Confirmar Senha" secureTextEntry />

                <StyledButton text="Criar" onPress={criarConta} />

                <StatusBar style="auto" />
            </View>
        )
    );
}
