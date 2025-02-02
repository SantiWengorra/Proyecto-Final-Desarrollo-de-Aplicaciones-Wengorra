import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {

    const navigation = useNavigation();

    if (title === "Carrito") {
        return (
            <View style={styles.header}>
                <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </Pressable>
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                <Pressable style={styles.buttonPress} onPress={() => navigation.navigate("Cart")}>
                    <Entypo name="shopping-cart" size={24} color="white" />
                </Pressable>
            </View>
        );
    }else if (title === "Free Market") {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Cart")}>
                <Entypo name="shopping-cart" size={24} color="black" />
            </Pressable>
        </View>
    );
    }else if (title === "") {

        return (
            <View style={styles.header}>
                <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </Pressable>
            </View>
        );
    } else {
        return (
            <View style={styles.header}>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Cart")}>
                <Entypo name="shopping-cart" size={24} color="black" />
            </Pressable>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 15,
        marginTop: 10,
    },
    title: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#096bd0",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2,
        marginTop: 10,
    },
    buttonPress: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#074c9e",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2,
        opacity: 0.8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 10,
    }
});

export default Header;
