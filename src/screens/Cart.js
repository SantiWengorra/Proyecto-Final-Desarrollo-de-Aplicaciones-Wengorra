import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import CartCard from '../components/CartCard';
import Header from '../components/Header';
import { useGetCartQuery, useDeleteCartMutation } from "../services/cart"
import { usePostOrdersMutation } from '../services/orders'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  
  const localId = useSelector(state => state.user.localId)
  const { data: cart, isLoading, isError, error } = useGetCartQuery(localId);
  const [triggerDeleteCart] = useDeleteCartMutation()
  const [triggerPostOrder] = usePostOrdersMutation()
  const navigator = useNavigation();

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

  const confirmCart = () => {
    const createdAt = new Date().toLocaleString()
    const order = {
      products:cart,
      createdAt,
      total: cartProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)
    }
    triggerPostOrder({localId,order})
    triggerDeleteCart({localId})
    navigator.navigate("Orders")
  }

  const cartProducts = cart && Object.values(cart) || [];

  if (cartProducts.length === 0) {
    return (
      <>
      <Header title="Carrito" />
      <View style={styles.container}>
        <Text style={styles.emptyCart}>Tu carrito está vacío</Text>
      </View>
      </>
    );
  } else {
    return (
      <>
        <Header title="Carrito" />
        <View style={styles.container}>
          <FlatList 
            data={Object.values(cart)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                        <Pressable onPress={() => navigator.navigate('Home', { screen: 'ProductDetail', params: { item } })}>
                            <CartCard product={item} />
                        </Pressable>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
        <View style={styles.totalContainer}>
        <Text style={styles.total}>
          Total: $ {cartProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}
        </Text>

        </View>
        <Pressable style={styles.buttonContainer} onPress={confirmCart}>
          <Text style={styles.button}>Finalizar Compra</Text>
        </Pressable>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    margin: 20,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emptyCart: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default Cart;
