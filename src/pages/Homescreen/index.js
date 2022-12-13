import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet,
    TouchableOpacity, FlatList, ScrollView, Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import database from '../../config/Firebaseconfig';

import { doc, collection, onSnapshot, deleteDoc, query, getFirestore, update } from 'firebase/firestore';

import { getAuth, signOut } from "firebase/auth";

import Icon from 'react-native-vector-icons/FontAwesome';



export default function Homescreen() {
    const [home, setHome] = useState([]);
    const navigation = useNavigation();
    const auth = getAuth();


    // cadastrando itens 
    useEffect(() => {
        const q = query(collection(database, 'DbProjeto'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id });
            });
            setHome(todosArr);
            console.log("Serviços:", list)
        });
        return () => unsubscribe();
    }, []);


    //Buscar lista de itens
    const list = home.map(
        (elemento, index) => {
            return {
                key: index,
                idBd: elemento.id,
                description: elemento.description

            }
        },

    )

    //Função Sair
    function logout() {
        signOut(auth).then(() => {
            navigation.navigate("SignIn")
        }).catch(() => {
            alert("Erro ao sair")
        });
    }



    // função deletar
    async function dell(item) { //item vem do return do flatlist
        await deleteDoc(doc(database, "DbProjeto", item)).then(() => {
            console.log("Esse é do logo dell:", item)
        }).catch(() => {
            alert("Erro ao apagar")
        });

    }

    //função editTarefa
    async function editDb(description, id) {
        const edinovo = database.collection("DbProjeto").doc(id);
        await edinovo.update({ description: description })
        navigation.navigate("HomeScreen")
    }



    return (

        <View style={styles.back} >

            <Text style={styles.textoIni}> Bloco de Anotações </Text>

            <ScrollView style={styles.DescriptionTask} showsVerticalScrollIndicator={false}>
                <FlatList
                    style={styles.container}
                    data={home}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <View style={styles.fundoItem}>
                        <Text style={styles.textItem}>{item.description} </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Editar");
                                //Alert.alert("Estamos na versão B.E.T.A, desculpa pelo transtorno")
                            }}
                            style={styles.editTarefa}
                        >
                            <Icon name="pencil" size={20}
                                color='#fff' backgroundColor="#E0343C"
                                marginLeft={20}
                            >
                            </Icon>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                dell(item.id);
                                //Alert.alert("Estamos na versão B.E.T.A, desculpa pelo transtorno")
                            }}
                            style={styles.deleteTarefa}
                        >
                            <Icon name="trash" size={20}
                                color='#fff' backgroundColor="#E0343C"
                                marginLeft={20}
                            >
                            </Icon>
                        </TouchableOpacity>



                    </View>}


                />
            </ScrollView>

            <TouchableOpacity
                style={styles.ButtonNew}
                onPress={() => navigation.navigate("NewServico")}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.ButtonLogout}
                onPress={() => { logout(); }}>
                <Icon name="power-off" size={20} color='#fff' backgroundColor="#E0343C" > Sair</Icon>
            </TouchableOpacity>


        </View >



    );
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 90,
        alignContent: "center",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 90,
    },
    deleteTarefa: {
        justifyContent: "center",
        marginLeft: 210,
        marginTop: -20,

    },
    editTarefa: {
        justifyContent: "center",
        marginLeft: 170,
        marginTop: -20,
    },
    DescriptionTask: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        alignContent: "center",
        backgroundColor: "#FA4F58",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 118,
        color: "#E0343C",
    },

    //
    ButtonNew: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 295,
        backgroundColor: "#E0343C",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {
        color: "#ffffff",
        fontSize: 25,
        fontWeight: "bold",
    },
    ButtonLogout: {
        width: 60,
        height: 40,
        position: "absolute",
        bottom: 30,
        left: 40,
        backgroundColor: "#E0343C",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    fundoItem: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        paddingLeft: 24,
        width: "100%",
        height: 50,
        backgroundColor: "#da2535",
        borderRadius: 10,
        marginVertical: 10,
        shadow: 20,
    },
    textItem: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 5
    },
    back: {
        backgroundColor: "#FBF0EE"
    },
    textoIni: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#E0343C",
        left: "12.5%",
        top: 10

    },


});
