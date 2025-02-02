import { NavigationContainer } from "@react-navigation/native"
import TabNavigator from "./TabNavigator"
import AuthStack from "./AuthStack"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { fetchSession } from "../config/dbSqlite";
import { setUser } from "../features/userSlice";

const Navigator = () => {
    const idToken = useSelector(state => state.user.idToken);
    const dispatch = useDispatch()
    
    useEffect(()=>{
        (async ()=>{
          try {
            const sessionUser = await fetchSession()
            if(sessionUser){
              dispatch(setUser(sessionUser))
            }
          } catch (error) {
            console.log(error)
          }
        })()
  
      },[])
    
    return (
        <NavigationContainer>
            {idToken ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigator