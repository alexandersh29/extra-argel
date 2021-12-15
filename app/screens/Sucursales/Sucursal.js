import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import {map} from 'lodash';
import {Rating, ListItem, Icon} from 'react-native-elements';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
//Obtenemos el ancho de la ventana del dispositivo
const screenWidth = Dimensions.get("window").width;

const Sucursal = (propiedades) => {
  console.log(propiedades);

  const [sucursal, setSucursal] = useState(null);

  const { navigation, route } = propiedades;

  const { id, nombre } = route.params;

  const [rating, setRating] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: nombre });
  }, []);

  useFocusEffect( 
    useCallback(()=>{  

                /*Consultamos la sucursal con id recibido como parámetro desde la lista de sucursales*/ 
        db.collection("sucursales").doc(id).get() 
        .then((resp) =>{ 
            /*Extraemos los datos del documento recuperado en la consulta*/ 
            const datos=resp.data(); 
            /*Asignamos el id al conjunto de datos*/ 
            datos.id=resp.id; 
            /*Asignamos los datos de la sucursal recuperado a nuestro useState*/ 
            setSucursal(datos); 
            //Asignamos un rating promedio al state que se muestra en la vista
            setRating(datos.rating)
        }); 

     },[]) 
    );


  return (
    <View>
      {sucursal ? (
        <ScrollView vertical>
             <Informacion  
                        nombre={sucursal.nombre} 
                        direccion={sucursal.direccion} 
                        descripcion={sucursal.descripcion} 
                        rating={rating} 
                    />
        </ScrollView>
      ) : (
        <View style={styles.sucursales}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Producto</Text>
        </View>
      )}
    </View>
  );
};

function Informacion(propiedades){
  const {nombre,direccion,descripcion,rating} = propiedades;


  return(
    <View style={styles.viewSucursal}> 
            <View style={{flexDirection: 'row'}}> 
                <Text style={styles.nombre}>{nombre}</Text> 
                <Rating  
                style={styles.rating} 
                imageSize={20} 
                readonly 
                startingValue={parseFloat(rating)} 
                /> 
             </View> 
            <View style={{flexDirection: 'row'}}> 
                <Text style={styles.descripcion}>{descripcion}</Text> 
            </View> 
            <View> 
            { 
                listaItems.map((item, index) => ( 
                <ListItem key={index}  containerStyle={styles.listaInfo}> 
                    <Icon  name={item.iconName} type={item.iconType} color="#0A6ED3" /> 
                    <ListItem.Content> 
                    <ListItem.Title>{item.text}</ListItem.Title> 
                    </ListItem.Content> 
                </ListItem> 
                )) 
            } 
            </View> 
        </View>
  )
}

export default Sucursal;

const styles = StyleSheet.create({
  sucursales:{ 
    marginTop:10, 
    marginBottom:10, 
    alignItems: 'center', 
}, 
body:{ 
    flex: 1, 
    backgroundColor: 'white' 
     
}, 
viewSucursal:{ 
    padding:15 
}, 
nombre: { 
    fontSize:20, 
    fontWeight:"bold" 
}, 
descripcion: { 
    marginTop:5, 
    color:"grey" 
},
direccion: { 
  marginTop:5, 
  color:"grey" 
}, 
direccionTitulo: { 
  fontWeight:"bold", 
  marginTop:5, 
  color:"grey" 
}, 
rating: { 
  position:"absolute", 
  right:0 
}, 
listaInfo: { 
  borderBottomColor:"#D8D8D8", 
  borderBottomWidth:1 
   
}
});
