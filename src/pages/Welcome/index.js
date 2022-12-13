import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../imagem/tela_inicial.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>

                <Text style={styles.title}>Cadastre, monitore e organize seus serviços de qualquer lugar!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF3B4F",
    },
    containerLogo: {
        flex: 1,
        backgroundColor: "#FF3B4F",
        justifyContent: "center",
        alignItems: "center",
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: "#FF3B4F",
    },
    button: {
        position: "absolute",
        backgroundColor: "#FF3B4F",
        borderRadius: 50,
        paddingVertical: 8,
        width: "60%",
        alignSelf: "center",
        bottom: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#FFFFFE",
        fontWeight: "bold",
    }
})



