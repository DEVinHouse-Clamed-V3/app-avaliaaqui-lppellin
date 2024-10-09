import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView, Alert, Switch, StatusBar } from "react-native";
import axios from "axios";
import { NavProps } from "../interfaces/NavProps";

interface AvaliaProdutoProps {
    route: { params: { productId: number } }; // Defina o tipo do parâmetro
    navigation: any;
}

export default function AvaliaProduto({ route, navigation }: AvaliaProdutoProps) {

    const { productId } = route.params;

    const [productName, setProductName] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [experience, setExperience] = useState("");
    const [recommend, setRecommend] = useState(false);

    useEffect(() => {
        // Buscar o nome do produto usando o productId
        axios
            .get(`${process.env.EXPO_PUBLIC_API_URL}products/${productId}`)
            .then((response) => {
                setProductName(response.data.name);
            })
            .catch((error) => {
                console.error("Erro ao buscar produto", error);
                Alert.alert("Erro", "Erro ao carregar o produto.");
            });
    }, [productId]);

    const validateForm = () => {
        if (!name || !email || !feedback || !experience) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const evaluationData = {
            id: Date.now(),
            productId,
            name,
            email,
            feedback,
            experience,
            recommend,
        };

        axios
            .post(`${process.env.EXPO_PUBLIC_API_URL}evaluations`, evaluationData)
            .then(() => {
                Alert.alert("Sucesso", "Feedback enviado com sucesso!");
                navigation.goBack();
            })
            .catch((error) => {
                console.error("Erro ao enviar feedback", error);
                Alert.alert("Erro", "Erro ao enviar o feedback.");
            });
    };

    return (
        <SafeAreaView>
            <StatusBar barStyle="auto" />

            <Text>Avaliar Produto: {productName}</Text>

            <Text>Nome:</Text>
            <TextInput
                value={name}
                onChangeText={setName}

            />

            <Text>Email:</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"

            />

            <Text>Feedback:</Text>
            <TextInput
                value={feedback}
                onChangeText={setFeedback}
                multiline

            />

            <Text>Experiência:</Text>
            <TextInput
                value={experience}
                onChangeText={setExperience}

            />

            <Text>Recomenda?</Text>
            <View >
                <Text>Não</Text>
                <Switch value={recommend} onValueChange={setRecommend} />
                <Text>Sim</Text>
            </View>

            <Button title="Enviar Feedback" onPress={handleSubmit} />
        </SafeAreaView>
    );
}