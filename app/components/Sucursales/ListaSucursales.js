import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";

import {firebaseApp} from "../../utils/firebase";
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


export default function ListaSucursales(propiedades) {
  const { sucursales } = propiedades;

  return (
    <ScrollView>
      {size(sucursales) > 0 ? (
        <FlatList
          data={sucursales}
          renderItem={(sucursales) => <Sucursales sucursales={sucursales} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.sucursales}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Productos</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Sucursales(propiedades) {
  const { sucursales } = propiedades;

  //En casa lista se obtiene los datos de la producto
  const { imagenes, nombre, direccion, descripcion, id } = sucursales.item;
 
  return (
    
      <View style={styles.lista}>
        
        <View style={styles.viewimagen}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#0000ff" />}
            source = {imagenes[0] ? {uri: imagenes[0]} : require("../../../assets/img/no-encontrada.png")}
            style={styles.imagen}
          />
        </View>
        
        <View>
          <Text style={styles.nombre}>Nombre: {"\n"} {nombre}</Text>
          <Text style={styles.direccion}>Precio:{"\n"} {direccion}</Text>
          <Text style={styles.descripcion}>Descripcion:{"\n"} {descripcion.substring(0, 60)} ...</Text>
          <View style={styles.fixToText}>
          {/* Mediante la selección de cada colección se selecciona su ID y permite la eliminación */} 
          <Button 
          title="Eliminar"
          onPress={() => db.collection('sucursales').doc(id).delete()} 
        />       
      </View>
      <View>
         {/* Mediante la selección de cada colección se selecciona su ID y permite la eliminación */} 
        
        </View>
        </View>
        
      </View>
      
  );
}





const styles = StyleSheet.create({
  sucursales: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center"
  },

  lista: {
    flexDirection: "row",
    margin: 10
  },
  viewimagen: {
    marginLeft: 15
  },
  imagen: {
    width: 80,
    height: 80
  },
  nombre: {
    fontWeight: "bold"
  },
  direccion: {
    paddingTop: 2,
    color: "black"
  },
  descripcion: {
    paddingTop: 2,
    color: "black",
    width: 300
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
