import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavProps } from "../interfaces/NavProps";
import { Produto } from "../interfaces/Produto";

import { globalStyles } from "../global/globalStyles";




export default function ListaProdutos({ navigation }: NavProps) {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        axios
            .get(process.env.EXPO_PUBLIC_API_URL + 'products')
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos", error);
            });
    }, []);

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text>Lista de Produtos</Text>
            <FlatList style={styles.list}
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View >
                        <Text>{item.name}</Text>
                        <Image source={{ uri: item.image }} style={styles.img} />
                        <Text>{item.price}</Text>


                        <TouchableOpacity
                            onPress={() => navigation.navigate("AvaliaProduto", { productId: item.id })} // Passando o ID como parâmetro
                            style={globalStyles.btn}
                        >
                            <Text style={{ color: '#fff' }}>Avaliar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120
    },

    
});
