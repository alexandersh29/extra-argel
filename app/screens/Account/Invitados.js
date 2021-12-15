import React from 'react'
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default function Invitados() {

    const navegacion = useNavigation();
    return (
        <>
        <ScrollView centerContent={true} style={styles.body} >
            
            <Text style={styles.titulo} >Ingresa a tú perfil</Text>
            <Text style={styles.parrafo}>
                Bienvenido aquí podras inicias sesión o registrarte.
            </Text>
            <View>
                <Button
                    title="Inicia sesión"
                    type='solid'
                    onPress={ () => navegacion.navigate("login") }
                />
            </View>

        </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    body: {
        marginLeft:30,
        marginRight:30,
    },
    imagen:{
        height:320,
        width:'100%',
        marginBottom:30,
        marginTop:20,
    },
    titulo:{
        fontWeight:'blod',
        fontSize:19,
        marginBottom:10,
        textAlign:'center',
    },
    parrafo:{
        textAlign:'justify',
        marginBottom:20
    }
})