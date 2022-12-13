import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../../config/Firebaseconfig.js';

export default function SignIn() {

    const navigation = useNavigation();
    const [useremail, setEmail] = useState('');
    const [usersenha, setSenha] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigation.navigate("Homescreen");
            const uid = user.uid;
            console.log("id:", uid)
        }
    });

    const login = () => {

        signInWithEmailAndPassword(auth, useremail, usersenha)
            .then(userCredential => {
                const user = userCredential;
                console.log('user:', user);
            }).catch(error => {
                console.log(error)
                Alert.alert("Email ou senha invalidos");
            });
    };



    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.cabeçalho}>
                <Text style={styles.textoIni}>Bem Vind@!</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu [EMAIL] aqui"
                    style={styles.input}
                    value={useremail}
                    onChangeText={txt => setEmail(txt)}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Digite sua [SENHA] aqui"
                    style={styles.input}
                    value={usersenha}
                    onChangeText={txt => setSenha(txt)}
                />

                <TouchableOpacity style={styles.button} onPress={() => { login(); }}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registro} onPress={() => navigation.navigate("Registro")}>
                    <Text style={styles.registroText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF3B4F",
    },
    cabeçalho: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    textoIni: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFE",
    },
    containerForm: {
        backgroundColor: "#FFFFFE",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#FF3B4F",
        width: "100%",
        borderRadius: 12,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#FFFFFE",
        fontSize: 18,
        fontWeight: "bold",
    },
    registro: {
        marginTop: 14,
        alignSelf: "center",
    },
    registroText: {
        color: "#FF8A87",
    }
})