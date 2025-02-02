import { StyleSheet, View, Image, Text } from 'react-native';
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from '@react-navigation/native';
import { useGetUserQuery } from '../services/user';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSesion } from '../config/dbSqlite';
import { deleteUser } from '../features/userSlice';

const MyProfile = () => {
  const navigation = useNavigation();
  const localId = useSelector(state => state.user.localId);
  const { data: user, isLoading, isError, error } = useGetUserQuery({ localId });
  const dispatch = useDispatch();

  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Loading...</Text>
        </View>
    );
  }

  if (isError) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{error.message}</Text>
        </View>
    );
  }

  const handleLogout = () => {
    deleteSesion()
    dispatch(deleteUser())
  };

  return (
    <View style={styles.container}>
      <Image
        source={user?.profileImage ? { uri: user.profileImage } : require("../../assets/profile_default.png")}
        resizeMode='cover'
        style={styles.image}
      />
      <SubmitButton title="Agregar Imagen de Perfil" onPress={() => navigation.navigate("ImageSelector")} />
      <SubmitButton title="Agregar Localización" onPress={() => navigation.navigate("LocationSelector")} />
      <View>
        <Text style={user ? styles.textAddress : null}>{user?.address}</Text>
      </View>
      <SubmitButton title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  textAddress: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    color: "white",
  },
});