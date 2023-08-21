import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./LoginStyles";
import Translations from "../../languages/Translation";
import { useStats } from "../../Context/StatContext";

import Icon from "react-native-vector-icons/Entypo";

import CustomButton from "../../components/Button/Button";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

function Login({ navigation }) {

    const { language, setLanguage } = useStats();

    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const username = userInfo.user.email.split('@')[0];

        const { data, error } = await supabase.auth.signUp({
            email: userInfo.user.email,
            password: userInfo.user.email,
            options: {
                data: {
                    username: username,
                },
            }
        });
        
        if (data) {
            const { error } = await supabase
                .from('users')
                .insert({ email: userInfo.user.email, userID: data.user.id, userName: username, fullName: userInfo.user.name, profile_photo_url: userInfo.user.photo })

                console.log("error", error);
        }
        if (error) {
            console.log("error", error);
        }
        
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            console.log("Çıkış Yapıldı");

        } catch (error) {
            console.error(error);
        }
    };

    const changeLanguage = async () => {
        const newLanguage = language === "en" ? "tr" : "en";

        try {
            await AsyncStorage.setItem("language", newLanguage);
            setLanguage(newLanguage);
            console.log('Veri güncellendi.');
        } catch (error) {
            console.error('Veri güncellenirken hata oluştu:', error);
        }
    };

    function goToMailPage() {
        navigation.navigate("MailP");
    }

    function goToRegisterPage() {
        navigation.navigate("Register");
    }

    const sneakEnter = async () => {
        navigation.navigate("TabNavigator");
        await AsyncStorage.setItem("userId", "guest");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={changeLanguage} style={styles.languageBox}>
                <Text style={styles.languageText} >{Translations[language].selectLang} </Text>
                {language === "en" ? (
                    <Image source={require("../../images/eng.png")} style={styles.langImg} />
                ) : (
                    <Image source={require("../../images/tr.png")} style={styles.langImg} />
                )
                }
            </TouchableOpacity>
            <Image source={require("../../images/logo.png")} resizeMode="contain" style={styles.logo} />

            <CustomButton name={"google"} text={Translations[language].signInGoogle} color="black" onPress={signInWithGoogle} />
            <CustomButton name={"apple1"} text={Translations[language].signInApple} color="black" onPress={signOut} disabled={false} />
            <CustomButton name={"mail"} text={Translations[language].signInMail} color="black" onPress={goToMailPage} />

            <TouchableOpacity onPress={goToRegisterPage} style={styles.underText} >
                <Text> {Translations[language].noAccount} </Text>
                <Text style={{ color: "black", fontWeight: "bold" }} > {Translations[language].register} </Text>
            </TouchableOpacity>

            <Text style={{ marginBottom: 10, fontSize: 12 }} >{Translations[language].or}</Text>

            <TouchableOpacity onPress={sneakEnter} style={styles.box}>
                <Icon name={"mask"} size={18} color={"black"} style={styles.icon} />
                <View style={styles.seperator} />
                <View style={{ flex: 1, justifyContent: "center" }} >
                    <Text style={styles.text} >{Translations[language].sneak}    </Text>
                    <Text style={styles.text2} > {Translations[language].noSocial}  </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
};

export default Login;
