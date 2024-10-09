import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavProps } from "../interfaces/NavProps";
import { globalStyles } from "../global/globalStyles";

export default function Intro({ navigation }: NavProps) {
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="auto" />
            <Text style={globalStyles.title}>Avalie Aqui</Text>

            <Text style={globalStyles.text}>Escolha um produto que deseja avaliar e compartilhe sua experiência com outros consumidores.</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("ListaProdutos")}
                style={globalStyles.btn}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Entrar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

