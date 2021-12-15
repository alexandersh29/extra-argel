import React, { useState } from "react";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import { useNavigation } from "@react-navigation/native";
const widthScreen = Dimensions.get("window").width;
import uuid from "random-uuid-v4";
import {firebaseApp} from "../../utils/firebase";
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const FormSuc = () => {

  const navegacion = useNavigation();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const agregar = () => {
    if(!nombre|| !direccion|| !descripcion){
      console.log("no puedes dejar campos vacios");
    }else if(size(imagenes)===0){
      console.log("no puedes dejar la sucursal sin imagen"); 
    }else{
      subirImagenStorage()
      .then((resp) =>{

        db.collection("sucursales")
          .add({
            nombre: nombre,
            direccion: direccion,
            descripcion: descripcion,
            imagenes: resp,
            rating:0,
            ratingTotal:0,
            votos:0,
            creado:new Date(),
            creadoPor: firebase.auth().currentUser.uid,
          })
          .then(() =>{
            navegacion.navigate("sucursal");
          }).catch(() =>{
            console.log("No se pudo registrar la sucursal")
          });
      })
    }
  };

  const subirImagenStorage = async () =>{
    const imagenesBlob =[];

    await Promise.all(
      map(imagenes, async (imagen) =>{
        const response = await fetch(imagen);
        //indicamos que el tipo de archivo es imagenesBlob
        const blob = await response.blob();
        
        const ref = firebase.storage().ref("sucursales").child(uuid());

        await ref.put(blob).then(async (resultado) =>{

          await firebase.storage().ref(`sucursales/${resultado.metadata.name}`)
          .getDownloadURL()
          .then((urlFoto) =>{
            imagenesBlob.push(urlFoto);
          });
        });
      })

    );
    return imagenesBlob;
  }

  return (
    <ScrollView style={styles.scroll}>
      <ImagenPrincipal imagen={imagenes[0]} />
      <Formulario
        setNombre={setNombre}
        setDireccion={setDireccion}
        setDescripcion={setDescripcion}
      />
      <SubirImagen imagenes={imagenes} setImagenes={setImagenes} />
      <Button title="Registrar" buttonStyle={styles.btn} onPress={agregar} />
    </ScrollView>
  );
};

function Formulario(propiedades) {
  const { setNombre, setDireccion, setDescripcion } = propiedades;

  return (
    <View>
      <Input
        placeholder="Nombre"
        containerStyle={styles.form}
        onChange={(e) => setNombre(e.nativeEvent.text)}
      />
      <Input
        placeholder="Precio"
        containerStyle={styles.form}
        onChange={(e) => setDireccion(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setDescripcion(e.nativeEvent.text)}
      />
    </View>
  );
}

function SubirImagen(propiedades) {
  const { imagenes, setImagenes } = propiedades;
  const seleccionar = async () => {
    const resultado = await Permission.askAsync(Permission.MEDIA_LIBRARY);

    if (resultado === "denied") {
      console.log("Debes permitir el acceso a la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [, 3],
      });
      if (result.cancelled) {
        console.log("debes seleccionar una Imagen");
      } else {
        setImagenes([...imagenes, result.uri]);
        console.log(imagenes);
      }
      console.log(result);
    }
  };

  const eliminarImagen = (imagen) => {
    const copiaArreglo = imagenes;

    Alert.alert(
      "Eliminar Imagen",

      "¿Estás Seguro que deseas eliminar la ímagen?",
      [
        {
          text: "cancelar",
          atyle: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImagenes(filter(copiaArreglo, (url) => url !== imagen));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.vistaImagenes}>
      {size(imagenes) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          conteinerStyle={styles.icono}
          onPress={seleccionar}
        />
      )}
      {map(imagenes, function (imagen, index) {
        <Avatar
          key={index}
          style={styles.avatar}
          source={{ uri: imagen }}
          onPress={() => eliminarImagen(imagen)}
        />;
      })}
    </View>
  );
}

function ImagenPrincipal(propiedades) {
  const { imagen } = propiedades;
  return (
    <View>
      <Image
        source={ imagen ? { uri: imagen } : require("../../../assets/img/no-encontrada.png")}
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

export default FormSuc;

const styles = StyleSheet.create({
  scroll: {
    height: "100%",
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
  },
  vista: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
  },
  btn: {
    backgroundColor: "#0A6ED3",
    margin: 20,
  },
  vistaImagenes: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  icono: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
