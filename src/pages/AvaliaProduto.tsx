import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView, Alert, Switch, StatusBar, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../global/globalStyles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import api from "../services/api";

interface AvaliaProdutoProps {
    route: { params: { productId: number } };
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

    interface ExperienceHandler {
        (value: string): void;
    }

    const handleExperience: ExperienceHandler = (value) => {
        setExperience(value);
    };

    useEffect(() => {
        api
            .get(`/products/${productId}`)
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

        const reviewData = {
            id: Date.now(),
            productId,
            name,
            email,
            feedback,
            experience,
            recommend,
        };

        api
            .post(`/reviews`, reviewData)
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
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="light-content" />

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.card}>

                    <Text style={styles.title}>Avaliar Produto: {productName}</Text>

                    <Text style={styles.text}>Nome:</Text>
                    <TextInput
                        style={styles.inputField}
                        value={name}
                        onChangeText={setName}

                    />

                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={styles.inputField}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"

                    />


                    <Text style={styles.text}>Feedback:</Text>
                    <TextInput

                        style={styles.inputField}
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline

                    />


                    <Text style={styles.text}>Experiência:</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                experience === 'Ótimo' && styles.selectedButton,
                            ]}
                            onPress={() => handleExperience('Ótimo')}
                        >
                            <Text style={styles.buttonText}>Ótimo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                experience === 'Bom' && styles.selectedButton,
                            ]}
                            onPress={() => handleExperience('Bom')}
                        >
                            <Text style={styles.buttonText}>Bom</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                experience === 'Médio' && styles.selectedButton,
                            ]}
                            onPress={() => handleExperience('Médio')}
                        >
                            <Text style={styles.buttonText}>Médio</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                experience === 'Ruim' && styles.selectedButton,
                            ]}
                            onPress={() => handleExperience('Ruim')}
                        >
                            <Text style={styles.buttonText}>Ruim</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.text}>Recomenda?</Text>
                    <View style={styles.switchRow}>
                        <Text style={styles.text}>Não</Text>
                        <Switch value={recommend} onValueChange={setRecommend} />
                        <Text style={styles.text}>Sim</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.feedbackBtn}
                    >
                        <Text style={styles.buttonText}>Enviar Feedback</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#27274e',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: '90%',
    },

    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5
    },

    text: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
    },

    inputField: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        borderRadius: 5,
        padding: 5,
        color: '#fff',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        height: 40,
        marginVertical: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    button: {
        backgroundColor: '#6d6de2',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        width: 60,
        alignItems: 'center'
    },
    selectedButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
    },
    feedbackBtn: {
        backgroundColor: '#6d6de2',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
});