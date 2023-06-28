import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from "./InputStyles";
import Icon from "react-native-vector-icons/Ionicons";

function Input({ label, icon, placeholder, onChangeText }) {


    return (
        <SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.label}>{label} </Text>
                <View style={styles.inputBox} >
                    <Icon name={icon} size={16} color="black" />
                    <TextInput style={styles.textInput} autoCapitalize={"words"}
                        keyboardType={"default"} placeholder={placeholder} onChangeText={onChangeText} multiline={true} maxLength={80} />
                </View>
            </View>
        </SafeAreaView>

    )
};

export default Input;