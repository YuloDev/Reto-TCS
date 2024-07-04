// src/navigation/AppNavigator.tsx
import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import AddProduct from '../screens/AddProduct';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: true,
          animation: "fade",
          headerStyle: {
            backgroundColor: "#ffff",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 28,
          },
        }}
      >

        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="detail" component={Detail} options={{ headerShown: false }} />
        <Stack.Screen name="add" component={AddProduct} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;