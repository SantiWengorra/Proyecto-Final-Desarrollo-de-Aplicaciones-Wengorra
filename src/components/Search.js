import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const Search = ({filterByKeyword}) => {

    const [textInput, setTextInput] = useState("");
    const [Error, setError] = useState("");

    const search = () => {
        const regex = /[+\-*/%@#&]/
        if(regex.test(textInput)){
            return setError("Caracter no Valido")
        }else {
        filterByKeyword(textInput);
        }
        setError("");
    }

    const removeSearch = () => {
        setError("");
        filterByKeyword("");
        setTextInput("");
    }

    return (
        <>
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                value={textInput}
                onChangeText={(text)=>setTextInput(text)}
                placeholder='Buscar'/>
            <Pressable style={styles.button} onPress={search}>
                <AntDesign name="search1" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.button} onPress={removeSearch}>
                <Entypo name="squared-cross" size={24} color="black" />
            </Pressable>
        </View>
        <Text style={styles.error}>{Error && Error}</Text>
        </>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        flex: 1,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#007bff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2,
    },
    error: {
        fontSize: 14,
        color: "#e74c3c",
        marginBottom: 10,
        textAlign: "center",
        backgroundColor: "#f8f8f8",
    },
});