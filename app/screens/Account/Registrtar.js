import React, {useRef} from 'react'
import {Text, Image, ToastAndroid, View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormRegistro from '../../components/Account/FormRegistro';


export default function Registrtar() {

  

    
    return (
        <KeyboardAwareScrollView>
            
            <View style={styles.formulario} >
                <FormRegistro />
            </View>
           
        </KeyboardAwareScrollView>
        
        
    )
}


const styles = StyleSheet.create({
    contenedor:{
        marginRight:0,
        marginLeft:40
    },
    imagen:{
        
    },
    formulario:{
        marginTop:40,
        marginLeft:40,
        marginRight:40
    }
})