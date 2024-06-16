import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, Text, View, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledDropdown from '../components/StyledDropdown';
import StyledTextInput from '../components/StyledTextInput';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useAuth } from '../lib/AuthProvider';
import StyledButton from '../components/StyledButton';
import DespesaModal from './despesaModal';

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

export default function Despesa({ navigation }) {
    const [isFocus, setIsFocus] = useState(false);
    const [selectedAno, setSelectedAno] = useState(null);
    const [selectedMes, setSelectedMes] = useState(null);
    const [listAnos, setListAnos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [despesas, setDespesas] = useState([]);
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

    const lerDespesas = async (mes, ano) => {
        try {
            const response = await fetch(`http://localhost:8080/despesa/buscar?mes=${mes}&ano=${ano}`, {
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
        }
    }, [selectedMes, selectedAno]);

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-red-100">
            <ScrollView>
                <View className="flex-1 items-center justify-center bg-red-100">
                    <DespesaModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        listMes={listMes}
                        listAnos={listAnos}
                        token={token}
                    />
                    <View className="flex flex-row items-center justify-start">
                        <Text className="m-8 text-2xl font-bold">Despesas</Text>
                        <Pressable
                            className="bg-red-400 p-2 m-4 items-center rounded-md text-white shadow"
                            onPress={() => setModalVisible(true)}>
                            <Text className="text-white text-lg font-semibold">
                                {"Nova Despesa"}
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
                    {despesas.length > 0 ? despesas.map((despesa, index) => (
                        <View key={index} className="flex flex-row items-center justify-start">
                            <View className="w-44 bg-red-400 m-1 p-2 rounded">
                                <Text className="text-white">{despesa.descricao}</Text>
                            </View>
                            <View className="w-16 bg-red-400 m-1 p-2 rounded">
                                <Text className="text-white">{`R$ ${despesa.valor}`}</Text>
                            </View>
                            <View className="w-8 bg-red-400 m-1 p-2 rounded items-center">
                                <Entypo name="edit" size={18} color="white" />
                            </View>
                            <View className="w-8 bg-red-400 m-1 p-2 rounded items-center">
                                <MaterialIcons name="delete" size={18} color="white" />
                            </View>
                        </View>
                    )) : <Text className="m-8 text-xl font-bold">Nenhuma despesa encontrada</Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
