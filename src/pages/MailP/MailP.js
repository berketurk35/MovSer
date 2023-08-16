import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./MailPStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

function MailP() {
    return (
        <View style={styles.container} >
            <View style={styles.box}>
                <Icon name="email" size={16} style={styles.icon} />
                <TextInput placeholder="Email" style={styles.input} />
            </View>
            <View style={styles.box}>
                <Icon name="vpn-key" size={16} style={styles.icon} />
                <TextInput placeholder="Password" style={styles.input}/>
            </View>

            <TouchableOpacity style={styles.button} onPress={null} >
                <Text style={styles.buttonText}> Giriş Yap </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={null} style={styles.underText} >
                <Text> Hesabın yok mu?</Text>
                <Text style={{ color: "black", fontWeight: "bold" }} > Kayıt Ol </Text>
            </TouchableOpacity>
        </View>
    )
};

export default MailP;