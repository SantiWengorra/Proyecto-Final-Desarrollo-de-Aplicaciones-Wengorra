import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from "../screens/MyProfile"
import ImageSelector from '../screens/ImageSelector';
import LocationSelector from '../screens/LocationSelector';

const Stack = createNativeStackNavigator();

const MyProfileStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="MyProfile" 
            component={MyProfile}
            options={{ headerShown: false }}/>
        <Stack.Screen 
            name="ImageSelector" 
            component={ImageSelector}
            options={{ headerShown: false }}/>
        <Stack.Screen 
            name="LocationSelector" 
            component={LocationSelector}
            options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default MyProfileStack