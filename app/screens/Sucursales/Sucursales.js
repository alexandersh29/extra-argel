import React, {useState, useEffect, useCallback}   from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import {firebaseApp} from "../../utils/firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

import ListaSucursales from "../../components/Sucursales/ListaSucursales";


const db = firebase.firestore(firebaseApp);



const Sucursales = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [totalsuc, setTotalSuc] = useState(0);
  const [puntero, setPuntero] = useState(null);
  console.log(sucursales);
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
    
  }, []);

  useFocusEffect( 
    useCallback(()=>{ 

      /*accedemos a la colección de sucursales, consultamos los registros 
        con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales) 
        contamos y asignamos el total de sucursales al useState totalSuc*/ 
        db.collection("sucursales") 
            .get() 
            .then((res)=>{ 
                setTotalSuc(res.size); 
            }); 
            
             
            const arrSucursales=[]; 
           db.collection("sucursales") 
               .orderBy("creado","desc") 
               .limit(10) 
               .get() 
               .then((res)=>{ 
                   
                setPuntero(res.docs[res.docs.length -1]); 
                   
                res.forEach((doc)=>{ 
                //extraemos cada documento y lo almacenamos en un objeto sucursal 
                   const sucursal =doc.data(); 
                   //la clave de la sucursal no asigna a menos que lo indiquemos 
                   sucursal.id =doc.id; 
                   //almacenamos cada sucursal en un arreglo. 
                   arrSucursales.push(sucursal); 
                }); 
                //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales 
                setSucursales(arrSucursales); 
               });
      
      },[]) 
    );


  return (
    <View style={styles.vista}>
      <ListaSucursales sucursales={sucursales} />
      {user && (
        <Icon
        reverse
        type="material-commnunity"
        name="add"
        color="#517fa4"
        containerStyle={styles.btn}
        onPress={() => navigation.navigate("agregar-sucursal")}
      />
      )}
    </View>
  );
};

export default Sucursales;

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    //dibuja una sombra a las vistas en iOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
