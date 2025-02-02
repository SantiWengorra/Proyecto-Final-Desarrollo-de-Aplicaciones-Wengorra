import { StyleSheet, View, Image } from 'react-native'
import { usePatchImageProfileMutation } from '../services/user'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SubmitButton from '../components/SubmitButton'
import Header from '../components/Header'
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from '@react-navigation/native'

const ImageSelector = () => {
    const localId = useSelector(state => state.user.localId)
    const [image, setImage] = useState("")
    const [triggerAddImageProfile] = usePatchImageProfileMutation()
    const navigator = useNavigation()

    const pickImage = async (method) => {

      const {granted} = await ImagePicker.requestCameraPermissionsAsync()

      if(!granted) return

      const config = {
          aspect:[1,1],
          quality:0.2,
          base64:true,
          allowsEditing:true
      }

      const result = (method == "camera") ? 
          await ImagePicker.launchCameraAsync(config) 
          : 
          await ImagePicker.launchImageLibraryAsync(config)
  
      if(result.canceled) return
      setImage( "data:image/jpg;base64," + result.assets[0].base64)
  }

    const ConfirmImage = () => {
        triggerAddImageProfile({ localId, image })
        navigator.navigate("MyProfile")
    }

    return (
        <>
            <Header title="" />
            <View style={styles.container}>
                <Image
                    source={image ? { uri: image } : require("../../assets/profile_default.png")}
                    resizeMode="cover"
                    style={styles.image}
                />
            <SubmitButton title="Tomar Imagen con camara" onPress={()=>pickImage("camera")}/>
            <SubmitButton title="Tomar Imagen de galeria" onPress={()=>pickImage("")}/>
            <SubmitButton title="Confirmar" onPress={ConfirmImage}/>
            </View>
        </>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
})
