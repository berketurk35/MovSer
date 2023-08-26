import React, { useState, forwardRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import styles from "./RegisterStyles";
import FormInput from "../../components/FormInput/FormInput";
import CustomButton from "../../components/Button/Button";
import Translations from "../../languages/Translation";
import Toast from 'react-native-toast-message';
import { useStats } from "../../Context/StatContext";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

import Icon from "react-native-vector-icons/MaterialIcons";
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

function Register({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    const [err, setEr] = useState("");

    const { language, setLanguage } = useStats();

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const username = userInfo.user.email.split('@')[0];

            // Veritabanında kullanıcının kayıtlı olup olmadığını kontrol et
            const { data, error } = await supabase.auth.signInWithPassword({
                email: userInfo.user.email,
                password: userInfo.user.email,
            });
            if (data.user) {
                // Kayıtlı kullanıcıysa giriş yap
                await AsyncStorage.setItem('token', data.session.refresh_token);
                await AsyncStorage.setItem("userId", data.user.id);
                await AsyncStorage.setItem('rememberMe', 'true');
                navigation.navigate("TabNavigator");
            } else {
                // Kayıtlı değilse yeni bir kayıt oluştur
                const { data: signUpResponse } = await supabase.auth.signUp({
                    email: userInfo.user.email,
                    password: userInfo.user.email,
                    options: {
                        data: {
                            username: username,
                        },
                    }
                });
                if (signUpResponse) {
                    const { error: signUpError } = await supabase
                        .from('users')
                        .insert({ email: userInfo.user.email, userID: signUpResponse.user.id, userName: username, fullName: userInfo.user.name, profile_photo_url: userInfo.user.photo })

                    if (!signUpError) {
                        await AsyncStorage.setItem('token', signUpResponse.session.refresh_token);
                        await AsyncStorage.setItem("userId", signUpResponse.user.id);
                        await AsyncStorage.setItem('rememberMe', 'true');
                        navigation.navigate("TabNavigator");
                    }
                }

                if (signUpResponse.error) {
                    console.log("Hata oluştu:", signUpResponse.error);
                }
            }
        } catch (error) {
            if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
                console.log("Google Giriş Hatası:", error);
            }
        }
    };

    const toastConfig = {
        test: internalState => (
            <View style={{ height: 80, width: '90%', backgroundColor: "yellow" }} >
                <Text>{internalState.text1} </Text>
            </View>
        )
    }

    const ForwardedToast = forwardRef((props, ref) => {
        return <Toast config={toastConfig} ref={ref} {...props} />;
    });

    const showToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Kayıt başarılı, Giriş yapabilirsiniz.',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 10
        });
    };

    const signUpwithEmail = async () => {
        try {
            if (!email || !password || !username || !fullName) {
                setEr("Lütfen tüm bilgileri eksiksiz girin.");
                return;
            }

            if (username.length < 4 || username.length > 18) {
                setEr("Kullanıcı adı 4 ila 18 karakter arasında olmalıdır.");
                return;
            }

            if (!/^[a-zA-Z0-9]+$/.test(username)) {
                setEr("Kullanıcı adı sadece harf ve rakam içermelidir.");
                return;
            }

            if (fullName.length < 3 || fullName.length > 26) {
                setEr("Ad ve soyad 3 ila 26 karakter arasında olmalıdır.");
                return;
            }

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                    },
                }
            });

            if (data.user) {
                const { error: insertError } = await supabase
                    .from('users')
                    .insert([
                        {
                            email: email,
                            userID: data.user.id,
                            userName: username,
                            fullName: fullName,
                            profile_photo_url: "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg",
                        },
                    ]);

                setEmail("");
                setPassword("");
                setFullName("");
                setUsername("");

                showToastMessage();
                setTimeout(() => {
                    navigation.navigate("MailP");
                }, 2000);

            } else if (error) {
                if (error.message.includes('Unable to validate email address: invalid format')) {
                    setEr('E-posta adresi geçerli formatta değil.');
                } else if (error.message.includes('Signup requires a valid password')) {
                    setEr('Geçerli bir şifre girmeniz gerekmektedir.');
                } else if (error.message.includes('Password should be at least 6 characters')) {
                    setEr('Şifre en az 6 karakter olmalıdır.');
                } else if (error.message.includes('User already registered')) {
                    setEr('Kullanıcı zaten kayıtlı');
                } else {
                    setEr(error.message);
                }
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    function goToLoginPage() {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container} >
            <CustomButton name={"google"} text={Translations[language].signInGoogle} color="black" onPress={signInWithGoogle} />

            <Text style={styles.or} >{Translations[language].or}</Text>

            <FormInput name={"email"} placeholder={Translations[language].email} value={email} onChangeText={setEmail} secure={false} capital={"none"} />
            <FormInput name={"vpn-key"} placeholder={Translations[language].password} value={password} onChangeText={setPassword} secure={true} capital={"none"} />
            <FormInput name={"person"} placeholder={Translations[language].username} value={username} onChangeText={setUsername} secure={false} capital={"none"} />
            <FormInput name={"chrome-reader-mode"} placeholder={Translations[language].fullname} value={fullName} onChangeText={setFullName} secure={false} capital={"words"} />

            <Text style={styles.errorMessage} > {err} </Text>
            <TouchableOpacity style={styles.button} onPress={signUpwithEmail} >
                <Text style={styles.buttonText}> {Translations[language].register} </Text>
            </TouchableOpacity>
            <ForwardedToast />
            <TouchableOpacity onPress={goToLoginPage} style={styles.underText} >
                <Icon name="arrow-back" size={18} color={"black"} style={styles.icon2} />
                <Text style={{ color: "black" }} > {Translations[language].returnLogin} </Text>
            </TouchableOpacity>
        </View>
    )
};

export default Register;
