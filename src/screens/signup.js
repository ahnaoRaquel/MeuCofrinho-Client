import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function SignUp({ navigation }) {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmaSenha, setConfirmaSenha] = React.useState('');
    const [textDtNasc, setTextDtNasc] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); 
        setDate(currentDate);
        
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        setTextDtNasc(formattedDate);
    };

    // const showDatepicker = () => {
    //     setShowDatePicker(true);
    // };


    const criarConta = () => {
        axiosWithToken.post(`http://localhost:8080/usuario/salvar`, form)
            .then((response) => {
                if (response.status == 200) {
                    setRespostaOk(true);
                    navigate("/listagem-usuario");
                }
            })
            .catch((error) => {
                setRespostaErro(error.response.data['errors']);
                console.log(respostaErro);

            })

    }


    return (
        <View className="flex-1 items-center justify-center bg-red-100 ">
            <Text className="m-8 text-2xl font-bold">Criar Conta</Text>


            <StyledTextInput value={nome} onChangeText={setNome} label={"Nome"} />
            <StyledTextInput value={email} onChangeText={setEmail} label={"Email"} />

            {/* <StyledTextInput value={textDtNasc} label={"Data de Nascimento"} onPress={showDatepicker} /> */}
            <View className="text-start items-start bg-red-100">
                <Text>Data de Nascimento</Text>
                {
                    // showDatePicker &&
                    (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
            </View>

            <StyledTextInput value={senha} onChangeText={setSenha} label={"Senha"} />
            <StyledTextInput value={confirmaSenha} onChangeText={setConfirmaSenha} label={"Confirmar Senha"} />

            <StyledButton text={"Criar"} onPress={() => navigation.navigate('SignIn')} />

            <StatusBar style="auto" />
        </View>
    );
}
