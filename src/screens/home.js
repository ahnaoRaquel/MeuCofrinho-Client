import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import { Image } from "react-native";
import continueAssimImg from "../../assets/continue-assim.png";
import ProgressBar from '../components/CustomProgressBar';
import StyledDropdown from '../components/StyledDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
    { label: 'Fevereiro 2024', value: '1' },
    { label: 'Março 2024', value: '2' },
    { label: 'Abril 2024', value: '3' },
    { label: 'Maio 2024', value: '4' },
    { label: 'Junho 2024', value: '5' },
    { label: 'Julho 2024', value: '6' },
];


export default function Home() {
    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);


    return (

        <SafeAreaView className="flex-1  bg-pink-100 p-4">
            <Text className="text-2xl font-bold mb-10">Oii Louisi 😘</Text>
            <View className="flex-1 items-center ">

                < StyledDropdown data={data} label={"Selecione um mês"} value={value} isFocus={isFocus}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);

                    }} />

                <View className="my-10 items-center">
                    <Image source={continueAssimImg} />

                    <Text className="text-lg ">Continue assim!</Text>
                </View>


                <View className="flex flex-row gap-8">
                    <Text className="">Progresso</Text>
                    <Text className="">R$1.100/R$1.500</Text>
                </View>
                <View className="w-80 mt-6 items-center justify-center">
                    <ProgressBar progress={70} />
                </View>




            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
