import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Text, View, Image, Pressable } from 'react-native';
import continueAssimImg from "../../assets/continue-assim.png";
import ProgressBar from '../components/CustomProgressBar';
import StyledDropdown from '../components/StyledDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../lib/AuthProvider';

import { MaterialIcons } from '@expo/vector-icons';

const listMes = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' },
];

export default function Home() {
    const [selectedAno, setSelectedAno] = useState(null);
    const [selectedMes, setSelectedMes] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [listAnos, setListAnos] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [somaDespesas, setSomaDespesas] = useState(0);
    const [limite, setLimite] = useState(null);
    const { token, user } = useAuth();

    function getYearsFromCurrent(numYears) {
        const listAno = [];
        const currentTime = new Date();
        const year = currentTime.getFullYear();

        for (let i = 0; i < numYears; i++) {
            listAno.push({
                label: (year + i).toString(),
                value: year + i
            });
        }
        return listAno;
    }

    const getMonthLabel = (value) => {
        const month = listMes.find(item => item.value == value);
        return month ? month.label : '';
    };

    const lerLimite = async (mes, ano) => {
        try {
            const response = await fetch(`http://10.10.102.67:8080/limite/buscar?mes=${mes}&ano=${ano}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                timeout: 10000,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setLimite(data);
            } else {
                console.log('Erro na resposta:', response.status, response.statusText);
                const errorData = await response.json();
                Alert.alert('Erro', errorData.errors || errorData.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao buscar limite:', error);
            Alert.alert('', 'Nenhum limite encontrado');
        }
    }

    const lerDespesas = async (mes, ano) => {
        try {
            const response = await fetch(`http://10.10.102.67:8080/despesa/buscar?mes=${mes}&ano=${ano}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                timeout: 10000,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setDespesas(data);
                const total = data.reduce((sum, despesa) => sum + despesa.valor, 0);
                setSomaDespesas(total);
            } else {
                console.log('Erro na resposta:', response.status, response.statusText);
                const errorData = await response.json();
                Alert.alert('Erro', errorData.errors || errorData.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao buscar despesas:', error);
            Alert.alert('', 'Nenhuma despesa encontrada');
        }
    }

    useEffect(() => {
        setListAnos(getYearsFromCurrent(5));
    }, []);

    useEffect(() => {
        if (selectedMes && selectedAno) {
            const mesInt = parseInt(selectedMes);
            const anoInt = parseInt(selectedAno);
            lerDespesas(mesInt, anoInt);
            lerLimite(mesInt, anoInt);
        }
    }, [selectedMes, selectedAno]);

    return (
        <SafeAreaView className="flex-1 bg-red-100 p-4">
            <Text className="text-2xl font-bold mb-10">Seja bem-vindo! </Text>
            <View className="flex-1 items-center">
                <View className="flex flex-row gap-2">
                    <StyledDropdown data={listMes} label={"Mês"} value={selectedMes} isFocus={isFocus}
                        onChange={item => {
                            setSelectedMes(item.value);
                            setIsFocus(false);
                        }} />
                    <StyledDropdown data={listAnos} label={"Ano"} value={selectedAno} isFocus={isFocus}
                        onChange={item => {
                            setSelectedAno(item.value);
                            setIsFocus(false);
                        }} />
                </View>
                <Pressable
                    className="bg-red-400 mb-9 rounded-md text-white w-80 items-center shadow flex-1"
                    onPress={() => { lerDespesas(selectedMes, selectedAno); lerLimite(selectedMes, selectedAno) }}>

                    <View className=" bg-red-400 m-1 p-2 rounded ">
                        <MaterialIcons name="search" size={18} color="white" />
                    </View>
                </Pressable>

                <View className="my-10 items-center">
                    <Image source={continueAssimImg} />
                    <Text className="text-lg">Continue assim!</Text>
                </View>

                <View className="flex flex-row gap-8">
                    <Text>Progresso</Text>
                    <Text>R${somaDespesas.toFixed(2)}/R${limite ? limite.valorLimite.toFixed(2) : "0.00"}</Text>
                </View>
                <View className="w-80 mt-6 items-center justify-center">
                    <ProgressBar progress={limite ? (somaDespesas / limite.valorLimite) * 100 : 0} />
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
