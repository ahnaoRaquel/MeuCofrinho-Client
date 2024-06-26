import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../lib/AuthProvider';


export default function MeusDados({ navigation }) {
    const { logout, user } = useAuth();

    const handleLogout = async () => {

        await logout();
        navigation.navigate('SignIn');
    };

    return (

        <SafeAreaView className="flex-1  bg-red-100 p-4">
            <View className="flex-1 m-4 ">

                <View className="m-6">

                    <Text className="text-lg font-medium">Nome</Text>
                    <Text className="text-lg pb-2 text-gray-700">{user?.nome ?? ''}</Text>

                    <Text className="text-lg  font-medium">Email</Text>
                    <Text className="text-lg  pb-2 text-gray-700">{user?.email ?? ''}</Text>

                    <Text className="text-lg  font-medium">Data de Nascimento</Text>
                    <Text className="text-lg  pb-2 text-gray-700">{user?.dtNascimento ?? ''}</Text>

                </View>


                <StyledButton text={"Sair"} onPress={handleLogout} />



            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
