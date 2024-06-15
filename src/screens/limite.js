import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledDropdown from '../components/StyledDropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useAuth } from '../lib/AuthProvider';
import LimiteModal from './limiteModal';
import StyledButton from '../components/StyledButton';

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

export default function Limite({ navigation }) {
    const [isFocus, setIsFocus] = useState(false);
    const [selectedAno, setSelectedAno] = useState(null);
    const [selectedMes, setSelectedMes] = useState(null);
    const [listAnos, setListAnos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState();
    const { token } = useAuth();

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

            const response = await fetch(`http://localhost:8080/limites/buscar?mes=${mes}&ano=${ano}`, {
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
                setData(data)
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

    useEffect(() => {
        setListAnos(getYearsFromCurrent(5));
    }, []);

    useEffect(() => {
        if (selectedMes && selectedAno) {
            lerLimite(selectedMes, selectedAno);
        }
    }, [selectedMes, selectedAno]);

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-red-100">
            <ScrollView>
                <View className="flex-1 items-center justify-center bg-red-100">
                    <LimiteModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        listMes={listMes}
                        listAnos={listAnos}
                        token={token}
                    />
                    <View className="flex flex-row items-center justify-start">
                        <Text className="m-8 text-2xl font-bold">Limites</Text>
                        <Pressable
                            className="bg-red-400 p-2 m-4 items-center rounded-md text-white shadow"
                            onPress={() => setModalVisible(true)}>
                            <Text className="text-white text-lg font-semibold">
                                {"Novo Limite"}
                            </Text>
                        </Pressable>
                    </View>
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

                    {data != null ?
                        <>
                            <View className="flex flex-row items-center justify-start">
                                <View className="w-44 bg-red-400 m-1 p-3 rounded flex-1 flex-row items-center justify-center  ">
                                    <Text className="text-white font-bold flex-1 ">{`${getMonthLabel(data.mes)}/${data.ano}`}</Text>

                                    <Text className="text-white font-bold flex ">{`R$ ${data.valorLimite}`}</Text>
                                </View>
                            </View>

                            <View className="flex flex-row items-center justify-start ">
                                <View className="w-20 bg-red-400 m-1 p-2 rounded flex-1 flex-row  items-center justify-center">
                                    <Text className="text-white font-semibold">Editar</Text>
                                    <Entypo name="edit" size={18} color="white" />
                                </View>
                                <View className="w-20 bg-red-400 m-1 p-2 rounded flex-1 flex-row items-center justify-center">
                                    <Text className="text-white font-semibold">Excluir</Text>
                                    <MaterialIcons name="delete" size={18} color="white" />
                                </View>
                            </View></> : <></>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
