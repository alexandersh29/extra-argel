import React, {useEffect, useState, UseState} from 'react'
import {View, Text} from 'react-native'
import firebase from 'firebase/app';
import 'firebase/auth';

import Logged from './Logged';
import Invitados from './Invitados';

export default function Cuentas() {
    
    const [login, setlogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>{
            !user ? setlogin(false) :setlogin(true);
            
        });
        
    },[])

    if(login===null){ 
        console.log('No hay usuario registrado')
        return <Text>Cargando..</Text>
    }else{
        
        return login ? <Logged/>:<Invitados/>
        
    };

    
}
