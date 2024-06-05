import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';



export default function Limite({ navigation }) {


    return (

        <SafeAreaView className="flex-1 items-center justify-center bg-red-100 ">

            <Text className="m-8 text-2xl font-bold">Limite</Text>

        </SafeAreaView>
    );
}
