import React, {useState} from 'react'
import {StyleSheet, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import {validarEmail} from '../../utils/validaciones';
import {size, isEmpty} from 'lodash';

import {Input, Icon, Button} from 'react-native-elements';
import firebase from 'firebase/app';


export default function FormRegsitro(){

    
   const navigation = useNavigation();
    const [mostrar, setMostrar] = useState(false);
    const [mostrar1, setMostrar1] = useState(false);

    /*
    el estado datos alamcena los datos del formulario
    con la funcion valoresDefault con los campos cxreados*/
    const [datos, setDatos] = useState(valoresDefault); 
    
    const onSubmit = () => {
        //verificamos que los datos no vayan vacios
        if(isEmpty(datos.email)||isEmpty(datos.password)||isEmpty(datos.repeatedPassword) ){
            console.log("Los campos estan vacios")
            
        }else{
            firebase.auth().createUserWithEmailAndPassword(datos.email,datos.password)
            .then(resp =>{
                
                navigation.navigate('cuentas');
            })
            .catch(err =>{
                console.log(err)
                console.log('El correo ya esta en uso');
                
            })        
        };
        if(!validarEmail(datos.email)){
            console.log("el mail no es correcto");
        }
        else if(size(datos.password)<6){
            console.log("el password debe tener al menos 6 caracteres");
        }
        else if(datos.password!==datos.repeatedPassword){
            console.log("el password no coincide con el otro password")
        }else{
            console.log('ok')
            console.log(datos)
        }
        
    }

    /* metodo que recibe los que lso campos de input reciben */
    const onChange = (e, type) => {
        setDatos({...datos, [type]:e.nativeEvent.text});
    }
    return(
        <View>
            <Input
                placeholder='Correo electronico' 
                containerStyle={styles.inputForm}
                /* al escribir en el campo input se activa el evento y envia l metodo on change para su modificacion */
                onChange={(e)=> onChange(e, 'email') }
                rightIcon={
                    <Icon
                    type='material-comunity'
                    name='alternate-email'
                    iconStyle={styles.icono}
                    />
                }
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                /* si el state mostrar es falso se oculta el texto de lo contrario se muestra  */
                secureTextEntry={mostrar?false:true}
                onChange={(e)=> onChange(e,'password')}
                rightIcon={
                    <Icon
                    type='material-comunity'
                    /* si mostrar es falso el icono se ve con el ojito tapado de lo contrario abierto*/
                    name={mostrar?'visibility':'visibility-off'}
                    iconStyle={styles.icono}
                    onPress={() => setMostrar(!mostrar)}
                    />
                }
            />
            <Input
                placeholder='Repetir Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                 /* si el state mostrar es falso se oculta el texto de lo contrario se muestra  */
                 secureTextEntry={mostrar1?false:true}
                 onChange={(e)=> onChange(e, 'repeatedPassword')}
                rightIcon={
                    <Icon
                    type='material-comunity'
                    /* si mostrar es falso el icono se ve con el ojito tapado de lo contrario abierto*/
                    name={mostrar1?'visibility':'visibility-off'}
                    iconStyle={styles.icono}
                    onPress={() => setMostrar1(!mostrar1)+console.log('oculto') }
                    />
                }
            />
            <Button
                title='Registrar'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />

        </View>
        
    )
}

function valoresDefault() {
    return{
        email:'',
        password:'',
        repeatedPassword:'',
    };
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alingnItems: 'center',
        justyfiContent: 'center',
        marginTop:30,
    },
    inputForm:{
        width:'100%',
        marginTop:20,

    },
    btnContainer:{
        marginTop:20,
        width:'100%'
    },
    btn:{
        backgrounColor:'0a6ed3'
    },
    icono:{
        color:'#c1c1c1'
    }
})