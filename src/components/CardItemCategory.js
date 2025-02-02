import { StyleSheet, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardItemCategory = ({ name, image }) => {

    const navigation = useNavigation();

    return (
        <Pressable style={styles.card} onPress={() => navigation.navigate("ProductsByCategory",{name})}>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
            <Text style={styles.categoryTitle}>{name}</Text>
        </Pressable>
    );
};

export default CardItemCategory;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
        paddingBottom: 30,
        alignItems: 'center',
        height: 200,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 10,
    },
    categoryTitle: {
        marginTop: 5,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        textAlign: 'center',
        flexWrap: 'wrap',
    },
});