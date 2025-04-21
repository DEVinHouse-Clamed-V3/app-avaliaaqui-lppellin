import api from "../services/api";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavProps } from "../interfaces/NavProps";
import { Produto } from "../interfaces/Produto";

import { globalStyles } from "../global/globalStyles";




export default function ListaProdutos({ navigation }: NavProps) {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        api.get('/products')
            .then(response => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos", error);
            });
    }, []);

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={globalStyles.title}>Lista de Produtos</Text>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card} >

                        <Text style={styles.itemText}>{item.name}</Text>

                        <View style={styles.cardRow}>
                            <Image source={{ uri: item.image }} style={styles.img} />
                            <Text style={styles.itemDesc}>{item.description}</Text>
                        </View>

                        <View style={styles.cardRow}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AvaliaProduto", { productId: item.id })} // Passando o ID como parâmetro
                                style={globalStyles.btn}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Avaliar</Text>
                            </TouchableOpacity>
                            <Text style={styles.itemText}>{item.price}</Text>
                        </View>

                    </View>
                )}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        marginBottom: 10,
        borderRadius: 15,
    },

    itemText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#fff',

    },

    itemDesc: {
        fontSize: 16,
        marginBottom: 10,
        color: '#fff',
        width: '50%',

    },

    card: {
        backgroundColor: '#27274e',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '90%',
        alignSelf: 'center',



    },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#fff',

    },


});
