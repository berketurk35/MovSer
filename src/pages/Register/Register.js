import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import styles from "./RegisterStyles";
import FormInput from "../../components/FormInput/FormInput";
import CustomButton from "../../components/Button/Button";
import Translations from "../../languages/Translation";
import { useStats } from "../../Context/StatContext";

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
    const [fullName, setFullName] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [err, setEr] = useState("");

    const { language, setLanguage } = useStats();

    const signUpwithEmail = async () => {
        try {
            const { data, error } = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                    options: {
                        data: {
                            username: username,
                        },
                    }
                }
            );
            if (data) {
                const { error } = await supabase
                    .from('users')
                    .insert({ email: email, userID: data.user.id, userName: username, fullName: fullName, profile_photo_url: "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg" })

                setModalVisible(true);
                setEmail("");
                setPassword("");
                setFullName("");
                setUsername("");

                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate("MailP");
                }, 3000);
            }

            if (error) {
                if (error.message.includes('Password should be at least 6 characters')) {
                    setEr('Parola en az 6 karakter olmalıdır.');
                } else if (error.message.includes('Unable to validate email address: invalid format')) {
                    setEr('E-posta adresi geçerli formatta değil.');
                }
                else {
                    setEr('Bir hata oluştu. Lütfen tekrar deneyin.');
                }
            } else {
                setEr('');
            }
        } catch (error) {
            setEr('Bir hata oluştu. Lütfen tekrar deneyin.');
            console.error('Hata:', error);
        }
    };

    function goToLoginPage() {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container} >
            <CustomButton name={"google"} text={Translations[language].signUpGoogle} color="black" onPress={null} />

            <Text style={styles.or} >{Translations[language].or}</Text>

            <FormInput name={"email"} placeholder={Translations[language].email} value={email} onChangeText={setEmail} />
            <FormInput name={"vpn-key"} placeholder={Translations[language].password} value={password} onChangeText={setPassword} />
            <FormInput name={"person"} placeholder={Translations[language].username} value={username} onChangeText={setUsername} />
            <FormInput name={"chrome-reader-mode"} placeholder={Translations[language].fullname} value={fullName} onChangeText={setFullName} />

            <Text> {err} </Text>
            <TouchableOpacity style={styles.button} onPress={signUpwithEmail} >
                <Text style={styles.buttonText}> {Translations[language].register} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLoginPage} style={styles.underText} >
                <Icon name="arrow-back" size={18} color={"black"} style={styles.icon2} />
                <Text style={{ color: "black" }} > {Translations[language].returnLogin} </Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{textAlign: "center", paddingBottom: 10, color: "black", fontSize: 18}} >Kayıt başarılı</Text>
                        <Text style={{textAlign: "center", paddingBottom: 10, color: "black"}}>Giriş yaparak uygulamayı kullanmaya başlayabilirsiniz.</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default Register;
