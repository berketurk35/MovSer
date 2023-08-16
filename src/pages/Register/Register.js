import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./RegisterStyles";
import FormInput from "../../components/FormInput/FormInput";
import CustomButton from "../../components/Button/Button";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ukdilyiayiqrwhbveugn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZGlseWlheWlxcndoYnZldWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NjAxMTMsImV4cCI6MjAwNzIzNjExM30.gFHaGvPtHMPp3sm8hHPG7MtV6TEQ4cve6ob9WNhvz2c";

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

function Register({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const signUpwithEmail = async () => {
        const { data, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                    },
                    send_verification_email: false
                }
            }
        )
        console.log("data", data);
    };

    function goToLoginPage() {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container} >
            <Image source={require("../../images/logo.png")} resizeMode="contain" style={styles.logo} />
            <CustomButton name={"google"} text={"Google ile kayıt ol"} color="black" onPress={null} />

            <Text style={styles.or} >Or</Text>

            <FormInput name={"email"} placeholder={"Email"} value={email} onChangeText={setEmail} />
            <FormInput name={"vpn-key"} placeholder={"Password"} value={password} onChangeText={setPassword} />
            <FormInput name={"person"} placeholder={"Username"} value={username} onChangeText={setUsername} />

            <TouchableOpacity style={styles.button} onPress={signUpwithEmail} >
                <Text style={styles.buttonText}> Kayıt Ol </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLoginPage} style={styles.underText} >
                <Icon name="arrow-back" size={18} color={"black"} style={styles.icon2} />
                <Text style={{ color: "black" }} > Ana giriş sayfasına dön </Text>
            </TouchableOpacity>
        </View>
    )
};

export default Register;
