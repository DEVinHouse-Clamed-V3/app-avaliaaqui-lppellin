import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { NavProps } from "../interfaces/NavProps";
import { Produto } from "../interfaces/Produto";





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
        <SafeAreaView>
            <Text>Lista de Produtos</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View >
                        <Text>{item.name}</Text>


                        <TouchableOpacity
                            onPress={() => navigation.navigate("AvaliaProduto", { productId: item.id })} // Passando o ID como parâmetro
                        >
                            <Text>Avaliar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
