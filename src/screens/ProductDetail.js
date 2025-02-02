import { StyleSheet, Text, Image, ScrollView, Pressable } from 'react-native';
import Header from '../components/Header';
import Counter from '../components/Counter';
import { usePostCartMutation } from '../services/cart';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({ route }) => {
  const { item: product } = route.params;

  const localId = useSelector(state => state.user.localId);
  const [triggeraddToCart] = usePostCartMutation();
  const counter = useSelector(state => state.counter.value);
  const navigator = useNavigation();

  const addToCart = () => {
    const cartProduct = {
      ...product,
      quantity: counter,
    }
    triggeraddToCart({localId, cartProduct});
    navigator.navigate('Cart');
  }

  return (
    <>
      <Header title="" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.image} source={{ uri: product.thumbnail }} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Counter stock={product.stock} />
        <Pressable style={styles.button} onPress={addToCart}>
          <Text style={styles.buttonText}>Añadir al Carrito</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: '#00b894',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});