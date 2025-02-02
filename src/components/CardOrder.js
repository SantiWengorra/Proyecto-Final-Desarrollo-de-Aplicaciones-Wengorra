import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

const CardOrder = ({ order }) => {
  
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prevState => !prevState);
  }

  const products = Object.values(order.products);

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.date}>Creada el: {order.createdAt}</Text>
        <Text style={styles.total}>TOTAL: ${order.total}</Text>
      </View>
      <Pressable onPress={toggleExpand} style={styles.expandButton}>
        <AntDesign name={expanded ? "minus" : "plus"} size={20} color="white" />
        <Text style={styles.expandText}>{expanded ? "Ver menos" : "Ver más"}</Text>
      </Pressable>

      {expanded && (
        <View style={styles.productsContainer}>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                  <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

export default CardOrder;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b894',
    marginVertical: 10,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  expandText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  productsContainer: {
    marginTop: 15,
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});
