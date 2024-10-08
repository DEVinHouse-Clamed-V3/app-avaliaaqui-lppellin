import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { NavProps } from "../interfaces/NavProps";




export default function Intro({ navigation }: NavProps) {





    return (
        <SafeAreaView>
            <Text>Avalie Aqui</Text>

            <Text>Escolha um produto que deseja avaliar e compartilhe sua experiência com outros consumidores.</Text>

            <TouchableOpacity onPress={() => navigation.navigate("ListaProdutos")}>
                <Text>Entrar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}