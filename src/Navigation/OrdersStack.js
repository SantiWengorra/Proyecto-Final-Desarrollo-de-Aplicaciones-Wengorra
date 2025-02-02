import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../screens/Orders';

const Stack = createNativeStackNavigator();

const OrdersStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Orders" 
            component={Orders} 
            options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default OrdersStack