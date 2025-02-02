import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Form from "../components/Form";
import Submit from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "../services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { loginSchema } from "../validations/loginSchema";
import { deleteSesion, insertSession } from "../config/dbSqlite";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigator = useNavigation();
    const [triggerLogin] = useLoginMutation();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            loginSchema.validateSync({ email, password }, { abortEarly: false });

            const response = await triggerLogin({ email, password });
            const user = {
                email: response.data.email,
                idToken: response.data.idToken,
                localId: response.data.localId
            };
            dispatch(setUser(user));
            deleteSesion()
            insertSession(user.localId, user.email, user.idToken);
        } catch (error) {
            error.inner.forEach((err) => {
                if (err.path === "email") setEmailError(err.message);
                if (err.path === "password") setPasswordError(err.message);
            });
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>¡Hola! Ingresa tu e-mail y contraseña</Text>
                <Form
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    isSecure={false}
                    error={emailError || ""}
                />
                <Form
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    isSecure={true}
                    error={passwordError || ""}
                />
                <Submit onPress={onSubmit} title="Login" />
                <Pressable onPress={() => navigator.navigate("SignUp")}>
                    <Text style={styles.register}>Don't have an account? Sign up</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    forgotPassword: {
        marginTop: 15,
        color: "#0066cc",
        textAlign: "center",
        fontSize: 14,
    },
    register: {
        marginTop: 10,
        color: "#333",
        textAlign: "center",
        fontSize: 14,
    },
});

export default Login;
