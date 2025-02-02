import { StyleSheet, FlatList, View, Text } from 'react-native';
import Header from '../components/Header';
import CardOrder from '../components/CardOrder';
import { useGetOrdersUserQuery } from '../services/orders'
import { useSelector } from 'react-redux'

const Orders = () => {

  const localId = useSelector(state => state.user.localId)
  const {data:orders,isLoading} = useGetOrdersUserQuery({localId})
  console.log(orders)

  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Loading...</Text>
        </View>
    );
  }

  if(!orders) return (
    <>
    <Header title="Órdenes" />
    <View style={styles.container}>
      <Text style={styles.emptyOrders}>No Hay Ordenes</Text>
    </View>
    </>
  )
    return (
      <>
        <Header title="Órdenes" />
        <View>
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({item})=> <CardOrder order={item}/>}
          />
        </View>
      </>
    );
}

export default Orders;

const styles = StyleSheet.create({
  emptyOrders: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

