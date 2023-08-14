import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./LoginStyles";

function Login() {

    const [language, setLanguage] = useState("tr");

    return (
        <View style={styles.container} >
            <Image source={require("../../images/logo.png")} resizeMode="contain" style={styles.logo} />
            <Text>Burada Bir seyler olacak </Text>

            {language === 'en' ? (
                <Image source={require('../../images/eng.png')} resizeMode="contain" style={styles.flagImage} />
            ) : (
                <Image source={require('../../images/tr.png')} resizeMode="contain" style={styles.flagImage} />
            )}

        </View>
    )
};

export default Login;