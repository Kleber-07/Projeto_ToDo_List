import React, { useState } from 'react';
import {
    Text, StyleSheet, Alert,
    TouchableOpacity, TextInput
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { collection, getFirestore, addDoc } from 'firebase/firestore';


export default function NewServico() {

    const [userdesc, setDesc] = useState('');
    const navigation = useNavigation();

    const db = getFirestore();

    const adTarefa = () => {
        if (userdesc === "") {
            return;
        } else {
            const ddocRef = addDoc(collection(db, 'DbProjeto'), {
                description: userdesc
            }).then(() => {
                navigation.navigate("Homescreen")
                console.log("Documento OK", ddocRef.id)
            })
                .catch((error) => {
                    console.log("Não")
                })
        }

    }



    return (

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>

            <Text style={styles.title}>Serviço </Text>

            <TextInput
                placeholder="Digite a descrição"
                style={styles.input}
                value={userdesc}
                onChangeText={txt => setDesc(txt)}
            />

            <TouchableOpacity style={styles.button} onPress={() => { adTarefa(); }}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

        </Animatable.View >

    );
};
const styles = StyleSheet.create({
    containerForm: {
        flex: 1,
        backgroundColor: "#E6E2E5",
        paddingTop: 20
    },
    title: {
        fontSize: 20,
        marginTop: 28,
        marginLeft: 10
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        marginLeft: 10
    },
    button: {
        backgroundColor: "#FF3B4F",
        width: "50%",
        borderRadius: 12,
        paddingVertical: 8,
        marginTop: 14,
        left: 90,
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
    },
});
