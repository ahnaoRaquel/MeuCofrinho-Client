import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';



export default function MeusDados({ navigation }) {


    return (

        <SafeAreaView className="flex-1  bg-red-100 p-4">
            <Text className="text-2xl font-bold mb-10">Oii Louisi 😘</Text>
            <View className="flex-1 m-4 ">

                <View className="m-6">

                    <Text className="text-lg font-medium">Nome</Text>
                    <Text className="text-lg pb-2 text-gray-700">Louisi</Text>

                    <Text className="text-lg  font-medium">Email</Text>
                    <Text className="text-lg  pb-2 text-gray-700">louisi@email.com</Text>

                    <Text className="text-lg  font-medium">Data de Nascimento</Text>
                    <Text className="text-lg  pb-2 text-gray-700">29/10/2003</Text>

                </View>


                <StyledButton text={"Sair"} onPress={() => navigation.navigate('SignIn')} />



            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
