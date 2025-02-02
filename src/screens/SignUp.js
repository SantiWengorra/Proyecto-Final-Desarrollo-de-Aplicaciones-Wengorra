import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/Form";
import Submit from "../components/SubmitButton";
import Header from "../components/Header";
import { useSignUpMutation } from "../services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { signupSchema } from "../validations/signupSchema";
import { insertSession } from "../config/dbSqlite";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [triggerSignUp] = useSignUpMutation();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            signupSchema.validateSync({ name, email, password, confirmPassword }, { abortEarly: false });

            const response = await triggerSignUp({ email, password });
            const user = {
                email: response.data.email,
                idToken: response.data.idToken,
                localId: response.data.localId
            };
            dispatch(setUser(user));
            insertSession(user.localId, user.email, user.idToken);
        } catch (error) {
            setNameError("");
            setEmailError("");
            setPasswordError("");
            setConfirmPasswordError("");

            error.inner.forEach((err) => {
                if (err.path === 'name') setNameError(err.message);
                if (err.path === 'email') setEmailError(err.message);
                if (err.path === 'password') setPasswordError(err.message);
                if (err.path === 'confirmPassword') setConfirmPasswordError(err.message);
            });
        }
    };

    return (
        <>
            <Header title=""/>
            <View style={styles.container}> 
                <Text style={styles.heading}>Registrarse</Text>
                <Form
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    isSecure={false}
                    error={nameError || ""}
                />
                <Form
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    isSecure={false}
                    error={emailError || ""}
                />
                <Form
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    isSecure={true}
                    error={passwordError || ""}
                />
                <Form
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    isSecure={true}
                    error={confirmPasswordError || ""}
                />
                <Submit onPress={onSubmit} title="Sign Up"/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    forgotPassword: {
        marginTop: 15,
        color: '#0066cc',
        textAlign: 'center',
        fontSize: 14,
    },
    register: {
        marginTop: 10,
        color: '#333',
        textAlign: 'center',
        fontSize: 14,
    }
});

export default SignUp;