import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Image } from "react-native";
import continueAssimImg from "../../assets/continue-assim.png";
import ProgressBar from '../components/CustomProgressBar';
import StyledDropdown from '../components/StyledDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const listMes = [
    { label: 'Fevereiro', value: '1' },
    { label: 'Março', value: '2' },
    { label: 'Abril', value: '3' },
    { label: 'Maio', value: '4' },
    { label: 'Junho', value: '5' },
    { label: 'Julho', value: '6' },
];


export default function Home() {
    const [selectedAno, setSelectedAno] = React.useState(null);
    const [selectedMes, setSelectedMes] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);
    const [listAnos, setListAnos] = useState([]);

    function getYearsFromCurrent(numYears) {
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var listAno = [];
        for (var i = 0; i < numYears; i++) {
            listAno.push({
                label: (year + i).toString(),
                value: (i + 1).toString()
            });
        }
        return listAno;
    }

    useEffect(() => {
        setListAnos(getYearsFromCurrent(5));
    }, []);

    return (

        <SafeAreaView className="flex-1  bg-red-100 p-4">
            <Text className="text-2xl font-bold mb-10">Oi, Luffy</Text>
            <View className="flex-1 items-center ">
                <View className="flex flex-row gap-2">
                    <StyledDropdown data={listMes} label={"Mês"} value={selectedMes} isFocus={isFocus}
                        onChange={item => {
                            setSelectedAno(item.value);
                            setIsFocus(false);

                        }} />
                    <StyledDropdown data={listAnos} label={"Ano"} value={selectedAno} isFocus={isFocus}
                        onChange={item => {
                            setSelectedAno(item.value);
                            setIsFocus(false);

                        }} />
                </View>

                <View className="my-10 items-center">
                    <Image source={continueAssimImg} />

                    <Text className="text-lg ">Continue assim!</Text>
                </View>


                <View className="flex flex-row gap-8">
                    <Text className="">Progresso</Text>
                    <Text className="">R$800/R$1.500</Text>
                </View>
                <View className="w-80 mt-6 items-center justify-center">
                    <ProgressBar progress={55} />
                </View>

            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
