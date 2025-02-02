import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CardProduct = ({product}) => {

    const {title, price, description, stock, thumbnail, discountPercentage} = product
    if (discountPercentage > 0) {
  return (
    <View>
        <Text style={styles.discount}>{Math.round(discountPercentage)}% Off</Text>
        <Image 
            style={styles.image} 
            source={{ uri: thumbnail }} 
        />
        <Text style={styles.productName}>{title}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <Text style={styles.productPrice}>${price}</Text>
        <Text style={styles.productStock}>Stock: {stock}</Text>
    </View>
  )
}else {
    return (
        <View>
            <Image 
                style={styles.image} 
                source={{ uri: thumbnail }} 
            />
            <Text style={styles.productName}>{title}</Text>
            <Text style={styles.productDescription}>{description}</Text>
            <Text style={styles.productPrice}>${price}</Text>
            <Text style={styles.productStock}>Stock: {stock}</Text>
        </View>
    )
}
}

export default CardProduct

const styles = StyleSheet.create({
    card: {
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5,
      marginBottom: 20,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    productDescription: {
      fontSize: 14,
      color: '#777',
      marginBottom: 10,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00b894',
      marginBottom: 5,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 12,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5,
    },
    discount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      backgroundColor: '#e74c3c',
      padding: 5,
      borderRadius: 5,
      marginBottom: 10,
    },
    productStock: {
      fontSize: 14,
      fontWeight: '500',
      color: '#888',
      marginBottom: 10,
    },
  });