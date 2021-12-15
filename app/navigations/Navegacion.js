import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements'

import RutasSucursales from './RutasSucursales';

import RutasCuenta from './RutasCuenta';


const Tab = createBottomTabNavigator();

export default function Navegacion() {
    return (
        <NavigationContainer style={{ flex: 1 }}>
            <Tab.Navigator
            initialRouteName="Cuenta"
            tabBarStyle={{
                tabBarInactiveTintColor:"#52585E",
                tabBarActiveTintColor:"#c90000"
            }}
            screenOptions={({route}) =>({
                tabBarIcon:({color, size}) => opciones(route,color)
            })}
            >
                <Tab.Screen 
                name="Productos"
                component={RutasSucursales}
                options={{headerShown:false}}
                  />
                <Tab.Screen 
                name='Cuenta'
                component={RutasCuenta}
                options={ { headerShown: false }}
                />
               
                
            </Tab.Navigator>

        </NavigationContainer>
    )
}

function opciones(route, color) {
    let iconName;

    switch (route.name) {
        case "Productos":
            iconName = "work";
            break;
        case "Cuenta":
            iconName = "person";
            break;
        default:
            break;
    }
    return(
        <Icon type="material-comunity" name={iconName} size={22} color={color} />
    )
}
