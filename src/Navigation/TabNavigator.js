import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ShopStack from "./ShopStack"
import CartStack from "./CartStack"
import OrdersStack from "./OrdersStack"
import TabBarIcon from "../components/TabBarIcon"
import MyProfileStack from "./MyProfileStack"

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={ShopStack} 
                    options={{ 
                        headerShown: false, 
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon="home"/>
                        }}/>
                <Tab.Screen 
                    name="Cart" 
                    component={CartStack} 
                    options={{ 
                        headerShown: false, 
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon="shopping-cart"/>
                        }}/>
                <Tab.Screen 
                    name="Orders" 
                    component={OrdersStack} 
                    options={{ 
                        headerShown: false, 
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon="shop"/>
                        }}/>
                <Tab.Screen 
                    name="MyProfile" 
                    component={MyProfileStack} 
                    options={{ 
                        headerShown: false, 
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} icon="user"/>
                        }}/>
    </Tab.Navigator>
  )
}

export default TabNavigator