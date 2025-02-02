import { StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';

const TabBarIcon = ({focused, icon}) => {

    if (focused) {
        return (
            <View style={styles.container}>
            <Entypo name={icon} size={24} color="black" />
            </View>
    )
    }else {
        return (
            <View style={styles.container}>
            <Entypo name={icon} size={24} color="gray" />
            </View>
        )
    }
}

export default TabBarIcon

const styles = StyleSheet.create({

})