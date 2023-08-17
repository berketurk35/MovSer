import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ButtonStyles";

import Icon from "react-native-vector-icons/AntDesign";

function Button({ name, text, color, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.box} disabled={disabled} >
            <Icon name={name} size={18} color={color} style={styles.icon}/>
            <View style={styles.seperator}/>
            <View style={{flex: 1, justifyContent: "center"}} >
                 <Text style={styles.text} > {text} </Text>
            </View>
        </TouchableOpacity>
    )
};

export default Button;

