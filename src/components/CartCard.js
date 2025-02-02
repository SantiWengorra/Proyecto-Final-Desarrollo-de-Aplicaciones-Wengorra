import { StyleSheet, Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useDeleteCartProductMutation } from '../services/cart';
import { useSelector } from 'react-redux';

const CartCard = ({ product }) => {
  const { title, description, price, quantity } = product;
  const localId = useSelector(state => state.user.localId)
  const [triggerDeleteItemCart] = useDeleteCartProductMutation()

  const handleDelete = () => {
    triggerDeleteItemCart({localId,productId:product.id})
}

  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text style={styles.quantity}>Cantidad: {quantity}</Text>
      </View>
      <Pressable style={styles.button} onPress={handleDelete}>
        <Entypo name="trash" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  quantity: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
