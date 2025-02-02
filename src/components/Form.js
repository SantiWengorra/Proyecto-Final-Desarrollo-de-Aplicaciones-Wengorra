import { StyleSheet, Text, View, TextInput } from 'react-native'

const Form = ({label, value, onChangeText, isSecure, error}) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
            value={value}
            onChangeText={onChangeText}
            style={styles.input} 
            secureTextEntry={isSecure}
        />
        {error ? <View><Text style={styles.error}>{error}</Text></View> : null}
    </View>
  )
}

export default Form;

const styles = StyleSheet.create({
    inputContainer: {
      marginBottom: 15,
      width: '100%',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 5,
    },
    input: {
      height: 45,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 15,
      fontSize: 16,
      backgroundColor: '#fff',
      color: '#333',
    },
    error: {
      marginTop: 5,
      color: 'red',
      fontSize: 12,
      marginLeft: 15,
    },
  })