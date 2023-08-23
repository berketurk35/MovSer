import React from 'react';
import { View, TextInput} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./FormInputStyles";

function FormInput({ name, placeholder, value, onChangeText, secure, capital }) {

    return (
        <View style={styles.box}>
            <Icon name={name} size={16} style={styles.icon} />
            <TextInput placeholder={placeholder} style={styles.input} value={value} onChangeText={onChangeText} secureTextEntry={secure}
  autoCapitalize={capital} />
        </View>
    )
};

export default FormInput;
