import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase/app";


function Logged() {
  return (
    <View style={styles.body}>
      <Text style={styles.textContent}> Bienvenido!!</Text>
      <Button
        title="Cerrar Sesión"
        type="solid"
        onPress={() => firebase.auth().signOut()}
      />
    </View>
  );
}

export default Logged;

const styles = StyleSheet.create({
  body: {
    marginLeft: 30,
    marginRight: 30,
  },
  textContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
