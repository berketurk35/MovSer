import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./MailPStyles";
import FormInput from "../../components/FormInput/FormInput";
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

function MailP({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function goToLoginPage() {
        navigation.navigate("Login");
    }

    const signInWithEmail = async () => {
        const { data, error } = await supabase.auth.signInWithPassword(
            {
                email: email,
                password: password,
            }
        )
        if (error) {
            setErrorMessage("Kullanıcı bulunamadı veya şifre hatalı."); 
        } else {
            navigation.navigate("TabNavigator");
        }
    };

    return (
        <View style={styles.container} >
            <Image source={require("../../images/logo.png")} resizeMode="contain" style={styles.logo} />
            <Text>Mail ile giriş </Text>

            <FormInput name={"email"} placeholder={"Email"} value={email} onChangeText={setEmail} />
            <FormInput name={"vpn-key"} placeholder={"Password"} value={password} onChangeText={setPassword} />
            <Text>  {errorMessage} </Text>

            <TouchableOpacity style={styles.button} onPress={signInWithEmail} >
                <Text style={styles.buttonText}> Giriş Yap </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLoginPage} style={styles.underText} >
                <Icon name="arrow-back" size={18} color={"black"} style={styles.icon2} />
                <Text style={{ color: "black" }} > Ana giriş sayfasına dön </Text>
            </TouchableOpacity>
        </View>
    )
};

export default MailP;
