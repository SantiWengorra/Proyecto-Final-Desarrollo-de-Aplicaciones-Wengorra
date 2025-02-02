import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import ProductsByCategory from "../screens/ProductsByCategory";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

const ShopStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductsByCategory"
          component={ProductsByCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  
export default ShopStack;
