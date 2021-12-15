import React, {useEffect} from 'react'
import Navegacion from './app/navigations/Navegacion';
import { firebaseApp } from './app/utils/firebase';
import firebase from "firebase/app";
import 'firebase/auth'

export default function App() {

useEffect(() => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
  })
},[]);

 
  return (
    <Navegacion/>
  );
}


