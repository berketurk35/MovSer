import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./LoginStyles";

import CustomButton from "../../components/Button/Button";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import { GoogleSignin, statusCodes, GoogleSigninButton } from "@react-native-google-signin/google-signin";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [language, setLanguage] = useState('en');

    GoogleSignin.configure({
        androidClientId: '214952846412-hl3vdaqtc3eqgnp4jo7637688qkt9rpf.apps.googleusercontent.com',
        webClientId: '214952846412-t8qkpquhomi9oef31it3grabm65uhdd5.apps.googleusercontent.com',
    });

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

    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const current = await GoogleSignin.getCurrentUser();
        const token = await GoogleSignin.getTokens();

        console.log("userInfo", userInfo);

        /*
        const { user, error } = await supabase.auth.signUp({
            email: userInfo.user.email, // email'i doğrudan userInfo'dan al
            password: userInfo.user.email, // şifreyi de email olarak ayarla (geçici olarak)
        });

        console.log("user", user);
        console.log("error", error);


        const { errorr } = await supabase
            .from('users')
            .insert({ username: userInfo.user.name, email: userInfo.user.email })
            */
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();

        } catch (error) {
            console.error(error);
        }
    };

    function goToMailPage() {
        navigation.navigate("MailP");
    }

    function goToRegisterPage() {
        navigation.navigate("Register");
    }

    function gir() {
        navigation.navigate("TabNavigator");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={null} style={styles.languageBox}>
                <Text style={styles.languageText} >Select Language</Text>
                {language === "en" ? (
                    <Image source={require("../../images/eng.png")} style={styles.langImg} />
                ) : (
                    <Image source={require("../../images/tr.png")} style={styles.langImg} />
                )
                }
            </TouchableOpacity>

            <Image source={require("../../images/logo.png")} resizeMode="contain" style={styles.logo} />

            <CustomButton name={"google"} text={"Google ile giriş yap"} color="black" onPress={signInWithGoogle} />
            <CustomButton name={"apple1"} text={"Apple ile giriş yap"} color="black" onPress={signOut} />
            <CustomButton name={"mail"} text={"Mail ile giriş yap"} color="black" onPress={goToMailPage} />

            <TouchableOpacity onPress={goToRegisterPage} style={styles.underText} >
                <Text> Hesabın yok mu?</Text>
                <Text style={{ color: "black", fontWeight: "bold" }} > Kayıt Ol </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={gir} style={styles.underText} >
                <Text style={{ color: "black", fontWeight: "bold" }} > Çaktırmadan Gir </Text>
            </TouchableOpacity>

        </View>
    )
};

export default Login;
