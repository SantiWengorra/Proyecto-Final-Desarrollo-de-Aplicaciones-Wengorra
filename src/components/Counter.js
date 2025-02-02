import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "../features/counterSlice";
import { useState } from "react";

const Counter = ({stock}) => {

  const [input, setInput] = useState(0);
  const counter = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.counterContainer}>
      <View style={styles.counterWrapper}>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (counter > 1) {
              dispatch(decrement());
            }
          }}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Text style={styles.counter}>{counter}</Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            if (counter < stock) {
              dispatch(increment());
            }
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      
      <TextInput 
        value={input.toString()}
        onChangeText={(t) => setInput(parseInt(t) || 0)}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Enter number"
      />
      <Pressable style={styles.actionButton} onPress={() => {
        const incrementValue = input;
        const newCounterValue = counter + incrementValue;

        if (newCounterValue <= stock) {
            dispatch(incrementByAmount(incrementValue));
        } else {
            const remainingStock = stock - counter;
            dispatch(incrementByAmount(remainingStock));
        }
        }}>
        <Text style={styles.actionButtonText}>Incrementar</Text>
      </Pressable>

      <Pressable style={styles.actionButton} onPress={() => dispatch(reset())}>
        <Text style={styles.actionButtonText}>Resetear</Text>
      </Pressable>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
    counterContainer: {
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    counterWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    counter: {
      fontSize: 32,
      fontWeight: '500',
      color: '#333',
      marginHorizontal: 15,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFF',
    },
    input: {
      width: 120,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      textAlign: 'center',
      marginVertical: 15,
      fontSize: 18,
      paddingHorizontal: 10,
    },
    actionButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8,
      minWidth: 200,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
    },
  });
  