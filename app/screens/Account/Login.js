import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Divider }  from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../../components/Account/FormLogin';

export default function Login() {

    const navegacion = useNavigation();

    return (
       <>
        <ScrollView>
       
            <View style={styles.contenedor}>
                <CrearCuenta/>
                <LoginForm/>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.contenedor}>

            </View>
            
        </ScrollView>

       </>
    )
}

function CrearCuenta(){

    const navegacion = useNavigation();
    return(
        <Text style={styles.textRegistrar}>¿Aún no tienes uns cuenta? {''}
        <Text
        style={styles.link}
        onPress={() => navegacion.navigate("registrar")}
        >Registrarme</Text>
        </Text>
    );
}


const styles = StyleSheet.create({
    usuario:{
        width:'100%',
        height:150,
        marginTop:20
        
    },
    contenedor:{
        marginRight:0,
        marginLeft:40,
        alignItems:'center'
    },
    textRegistrar:{
        marginRight:10,
        marginLeft:10,
        marginTop:15
    },
    link:{
        color:'#0a6ed3',
        fontWeight:'bold'
    },
    divider:{
        backgroundColor:'#0a6ed3',
        margin:40,
    },
    imagen:{
        height:320,
        width:'100%',
        marginBottom:30,
        marginTop:20,
    },
    textLog:{
        fontSize:'16px',
        fontWeight:'bold',
    }
})