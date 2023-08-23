import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./MailPStyles";
import Translations from "../../languages/Translation";
import { useStats } from "../../Context/StatContext";
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
    const [rememberMe, setRememberMe] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const { language, setLanguage } = useStats();

    useEffect(() => {
        checkRememberMe();
    }, []);

    const checkRememberMe = async () => {
        try {
            const rememberMeValue = await AsyncStorage.getItem('rememberMe');
            if (rememberMeValue === 'true') {
                const refreshToken = await AsyncStorage.getItem('token');
                if (refreshToken) {
                    // Yenileme belirteci ile sessizce giriş yapın
                    const { error } = await supabase.auth.getSession({ refreshToken });
                    if (!error) {
                        navigation.navigate("TabNavigator");
                    }
                }
            }
        } catch (error) {
            console.error('rememberMe değeri okunurken hata oluştu', error);
        }
    };

    const signInWithEmail = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (!error) {
            await AsyncStorage.setItem('token', data.session.refresh_token);
            await AsyncStorage.setItem("userId", data.user.id);
            if (rememberMe) {
                await AsyncStorage.setItem('rememberMe', 'true');
            } else {
                await AsyncStorage.setItem('rememberMe', 'false');
            }
            navigation.navigate("TabNavigator");
        } else {
            setErrorModal(true);
            setErrorMessage(Translations[language].notFoundUser);
        }
    };


    const remember = async () => {
        setRememberMe(!rememberMe);
        await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
    };

    function goToLoginPage() {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container} >
            <Image source={require("../../images/logo.png")} resizeMode="contain" style={styles.logo} />
            <Text>{Translations[language].signInMail} </Text>

            <FormInput name={"email"} placeholder={Translations[language].email} value={email} onChangeText={setEmail} secure={false} capital={"none"} />
            <FormInput name={"vpn-key"} placeholder={Translations[language].password} value={password} onChangeText={setPassword} secure={true} capital={"none"} />

            <View style={styles.touchbox}>
                <TouchableOpacity onPress={remember} style={styles.check} >
                    {rememberMe ? (
                        <Icon name={"check-box"} size={16} style={styles.checkIcon} color={"#1565C0"} />
                    ) : (
                        <Icon name={"check-box-outline-blank"} size={16} style={styles.checkIcon} />
                    )}

                    <Text style={{ fontSize: 14 }} >{Translations[language].rememberMe}</Text>
                </TouchableOpacity>
            </View>

            {errorModal &&
                <Text style={{color: "red"}} >{errorMessage}</Text>
                }

            <TouchableOpacity style={styles.button} onPress={signInWithEmail} >
                <Text style={styles.buttonText}> {Translations[language].login} </Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text style={styles.forget} >{Translations[language].forgot}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLoginPage} style={styles.underText} >
                <Icon name="arrow-back" size={18} color={"black"} style={styles.icon2} />
                <Text style={{ color: "black" }} > {Translations[language].returnLogin} </Text>
            </TouchableOpacity>
        </View>
    )
};

export default MailP;
