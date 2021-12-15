import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Account/Login';
import Cuentas from '../screens/Account/Cuentas';
import Registrar from '../screens/Account/Registrtar';

const Stack = createNativeStackNavigator();

function RutasCuenta() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='cuentas'
            component={Cuentas}
            options={{title:'Mi cuenta'}}
            />
            <Stack.Screen
            name='login'
            component={Login}
            options={{title:'Inicia sesión'}}
            />
            <Stack.Screen
            name='registrar'
            component={Registrar}
            options={{title:'Registrate'}}
            />
        </Stack.Navigator>
    )
}

export default RutasCuenta



