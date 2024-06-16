
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import StyledDropdown from '../components/StyledDropdown';
import StyledTextInput from '../components/StyledTextInput';

export default function LimiteModal({ modalVisible, setModalVisible, listMes, listAnos, token }) {
    const [selectedMes, setSelectedMes] = useState(null);
    const [selectedAno, setSelectedAno] = useState(null);
    const [valorLimite, setValorLimite] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const salvarLimite = async () => {
        if (!selectedMes || !selectedAno || !valorLimite) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        }
        const limite = {
            mes: parseInt(selectedMes),
            ano: parseInt(selectedAno),
            valorLimite: parseFloat(valorLimite),
        };

        try {
            console.log(limite)
            console.log(token)
            const response = await fetch('http://localhost:8080/limite/salvar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(limite),
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    console.log('Limite salvo com sucesso:', data);
                    Alert.alert('Sucesso', 'Limite salvo com sucesso');
                } else {
                    console.log('Resposta vazia ou formato inesperado');
                    Alert.alert('Sucesso', 'Limite salvo com sucesso');
                }
                setModalVisible(false);
            } else {
                const errorData = await response.json();
                console.error('Erro na resposta:', response.status, response.statusText);
                Alert.alert('Erro', errorData.errors || errorData.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao salvar limite:', error);
            Alert.alert('Erro', 'Erro ao salvar limite');
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
            <View className="mx-4 my-auto bg-red-100 items-center justify-center shadow rounded-lg ">
                <Text className="m-8 text-2xl font-bold">Limite</Text>
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
                <StyledTextInput value={valorLimite} onChangeText={setValorLimite} label={"Valor"} />
                <View className="flex flex-row gap-3 mt-4" >
                    <Pressable
                        className="bg-red-50 p-2 m-4 w-28 items-center rounded-md text-white shadow"
                        onPress={() => setModalVisible(false)}>
                        <Text className="text-red-400 text-lg font-semibold">
                            {"Cancelar"}
                        </Text>
                    </Pressable>
                    <Pressable
                        className="bg-red-400 p-2 m-4 w-28 items-center rounded-md text-white shadow"
                        onPress={salvarLimite}>
                        <Text className="text-white text-lg font-semibold">
                            {"Salvar"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}