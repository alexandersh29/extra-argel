import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sucursales from "../screens/Sucursales/Sucursales";
import AgregarSuc from "../screens/Sucursales/AgregarSuc";
import Sucursal from "../screens/Sucursales/Sucursal";

const Stack = createNativeStackNavigator();

const RutasSucursales = () => {
    return (
       
            <Stack.Navigator>
            <Stack.Screen
                name="sucursal"
                component={Sucursales}
                options={{title:"Productos"}}
            />
            <Stack.Screen
                name="agregar-sucursal"
                component={AgregarSuc}
                options={{title:"Agregar Productos"}}
            />
            <Stack.Screen
                name="ver-sucursal"
                component={Sucursal}
            />
        </Stack.Navigator>
      
        
    )
}

export default RutasSucursales

const styles = StyleSheet.create({})
