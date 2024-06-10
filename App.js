import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// https://icons.expo.fyi/Index

import SignIn from './src/screens/singin';
import SignUp from './src/screens/signup';
import Home from './src/screens/home';
import MeusDados from './src/screens/meusDados';
import Despesa from './src/screens/despesa';
import Limite from './src/screens/limite';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Despesa') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Limite') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Meus Dados') {
            iconName = focused ? 'person' : 'person-outline';
          }
         

          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: '#white', 
        tabBarStyle: { backgroundColor: '#b3090d' }, 
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Despesa" component={Despesa} options={{ headerShown: false }} />
      <Tab.Screen name="Limite" component={Limite} options={{ headerShown: false }} />
      <Tab.Screen name="Meus Dados" component={MeusDados} options={{ headerShown: false }} />
    
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
