import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Header from "../components/Header";
import CardItemCategory from "../components/CardItemCategory";
import Search from "../components/Search";
import { useGetCategoriesQuery } from "../services/shop";

const Home = ({ navigation }) => {
    const { data: categoriesData = [], isLoading, isError, Error } = useGetCategoriesQuery();
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        if (categoriesData.length > 0) {
            setFilteredCategories(categoriesData);
        }
    }, [categoriesData]);

    const filterByKeyword = (keyword) => {
        if (!keyword) {
            setFilteredCategories(categoriesData);
        } else {
            const filtered = categoriesData.filter((category) =>
                category.name.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredCategories(filtered);
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
                <Text>{Error.message}</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Header title="Free Market" />
            <Search filterByKeyword={filterByKeyword} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredCategories.length === 0 ? (
                    <Text>No categories found</Text>
                ) : (
                    filteredCategories.map((category, index) => (
                        <CardItemCategory
                            key={index}
                            name={category.name}
                            image={category.image}
                            navigation={navigation}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
});