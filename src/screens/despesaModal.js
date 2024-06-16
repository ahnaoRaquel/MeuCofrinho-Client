
import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, Text, View, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledDropdown from '../components/StyledDropdown';
import StyledTextInput from '../components/StyledTextInput';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useAuth } from '../lib/AuthProvider';
import StyledButton from '../components/StyledButton';

export default function DespesaModal({ modalVisible, setModalVisible, listMes, listAnos, token }) {
    const [selectedMes, setSelectedMes] = useState(null);
    const [selectedAno, setSelectedAno] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const salvarDespesa = async () => {
        if (!selectedMes || !selectedAno || !descricao || !valor) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        }
        console.log("ok campos completos")
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        console.log(formattedDate)
        const despesa = {
            mes: parseInt(selectedMes),
            ano: parseInt(selectedAno),
            descricao: descricao,
            valor: parseFloat(valor),
            data: formattedDate,
        };
        console.log(despesa)
        try {
            const response = await fetch('http://localhost:8080/despesas/salvar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(despesa),
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    console.log('Despesa salva com sucesso:', data);
                    Alert.alert('Sucesso', 'Despesa salva com sucesso');
                } else {
                    console.log('Resposta vazia ou formato inesperado');
                    Alert.alert('Sucesso', 'Despesa salva com sucesso');
                }
                setModalVisible(false);
            } else {
                const errorData = await response.json();
                console.error('Erro na resposta:', response.status, response.statusText);
                Alert.alert('Erro', errorData.errors || errorData.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao salvar despesa:', error);
            Alert.alert('Erro', 'Erro ao salvar despesa');
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View className="mx-4 my-auto bg-pink-100 items-center justify-center shadow rounded-lg ">
                <Text className="m-8 text-2xl font-bold">Despesa</Text>
                <StyledTextInput value={descricao} onChangeText={setDescricao} label={"Descrição"} />
                <StyledTextInput value={valor} onChangeText={setValor} label={"Valor"} />
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


                <View className="flex flex-row gap-3 mt-4" >
                    <Pressable
                        className="bg-pink-50 p-2 m-4 w-28 items-center rounded-md text-white shadow"
                        onPress={() => setModalVisible(false)}>
                        <Text className="text-pink-400 text-lg font-semibold">
                            {"Cancelar"}
                        </Text>
                    </Pressable>
                    <Pressable
                        className="bg-pink-400 p-2 m-4 w-28 items-center rounded-md text-white shadow"
                        onPress={salvarDespesa}>
                        <Text className="text-white text-lg font-semibold">
                            {"Salvar"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
