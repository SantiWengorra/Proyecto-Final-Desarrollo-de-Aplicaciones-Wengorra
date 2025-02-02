import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Search from "../components/Search.js";
import CardProduct from "../components/CardProduct.js";
import { useNavigation } from "@react-navigation/native";
import { useGetProductsQuery } from "../services/shop.js";

const ProductsByCategory = ({ route }) => {
    const { data: products = [], isError, error, isLoading } = useGetProductsQuery();
    const { name: category } = route.params;
    const navigation = useNavigation();
    const [productsfiltered, setProductsfiltered] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter(product => product.category === category);
            setProductsfiltered(filtered);
        }
    }, [products, category]);

    const filterByKeyword = (value) => {
        if (value) {
            setProductsfiltered(prevProducts =>
                prevProducts.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            const filtered = products.filter(product => product.category === category);
            setProductsfiltered(filtered);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{error.message}</Text>
            </View>
        );
    }

    return (
        <>
            <Header title={category} />
            <View style={styles.container}>
                <Search filterByKeyword={filterByKeyword} />
                <FlatList
                    data={productsfiltered}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.productCard}
                            onPress={() => navigation.navigate("ProductDetail", { item })}
                        >
                            <CardProduct product={item} />
                        </Pressable>
                    )}
                />
            </View>
        </>
    );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f4f4f4",
    },
    productCard: {
        backgroundColor: "#fff",
        marginBottom: 15,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});