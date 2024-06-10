import React from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledTextInput from '../components/StyledTextInput';
import StyledDropdown from '../components/StyledDropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const data = [
    { label: 'Fevereiro 2024', value: '1' },
    { label: 'Março 2024', value: '2' },
    { label: 'Abril 2024', value: '3' },
    { label: 'Maio 2024', value: '4' },
    { label: 'Junho 2024', value: '5' },
    { label: 'Julho 2024', value: '6' },
];

export default function Despesa({ navigation }) {
    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);
    const [text, onChangeText] = React.useState('text');
    const [modalVisible, setModalVisible] = React.useState(false);

    return (

        <SafeAreaView className="flex-1 items-center justify-center bg-red-100">
            <ScrollView >
                <View className="flex-1 items-center justify-center bg-red-100 ">

                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View className="mx-4 my-auto bg-red-400 items-center justify-center shadow rounded-lg ">
                            <Text className="m-8 text-2xl font-bold">Despesa</Text>

                            <StyledTextInput value={text} onChangeText={onChangeText} label={"Descrição"} />
                            <StyledTextInput value={text} onChangeText={onChangeText} label={"Valor"} />
                            <StyledDropdown data={data} label={"Selecione um mês"} value={value} isFocus={isFocus}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            />
                            <View className="flex flex-row gap-2" >
                                <Pressable
                                    className="bg-red-50 p-2 m-4 w-28 items-center rounded-md text-white shadow"
                                    onPress={() => setModalVisible(false)}>
                                    <Text className="text-red-400 text-lg font-semibold">
                                        {"Cancelar"}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="bg-red-400 p-2 m-4 w-28 items-center rounded-md text-white shadow"
                                    onPress={() => Alert.alert('salvo')}>
                                    <Text className="text-white text-lg font-semibold">
                                        {"Salvar"}
                                    </Text>
                                </Pressable>
                            </View>

                        </View>
                    </Modal>

                    <View className="flex flex-row items-center justify-start">
                        <Text className="m-8 text-2xl font-bold">Despesas</Text>

                        <Pressable
                            className="bg-red-400 p-2 m-4 items-center rounded-md text-white shadow"
                            onPress={() => setModalVisible(true)}>
                            <Text className="text-white text-lg font-semibold">
                                {"+ Nova Despesa"}
                            </Text>
                        </Pressable>
                    </View>

                    <StyledDropdown data={data} label={"Selecione um mês"} value={value} isFocus={isFocus}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                    <View className="flex flex-row items-center justify-start">

                        <View className="w-44 bg-red-400 m-1 p-2 rounded">
                            <Text className="text-white">Ifood</Text>
                        </View>
                        <View className="w-16 bg-red-400 m-1 p-2 rounded">
                            <Text className="text-white">R$100</Text>
                        </View>
                        <View className="w-8 bg-red-400 m-1 p-2 rounded items-center">
                            <Entypo name="edit" size={18} color="white" />

                        </View>
                        <View className="w-8 bg-red-400 m-1 p-2 rounded items-center">
                            <MaterialIcons name="delete" size={18} color="white" />
                        </View>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView >
    );
}
