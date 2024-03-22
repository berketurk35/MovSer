import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./SearchFilter2Styles";

import Icon from "react-native-vector-icons/Ionicons";

function SearchFilter2({ placeholder, value, onChangeText, onPress, text }) {
    return (
        <View style={styles.filterContainer} >
            <View style={styles.search} >
                <Icon name="search" size={16} color={"black"} style={styles.icon} />
                <TextInput style={styles.textInput} fontSize={12} placeholder={placeholder} placeholderTextColor={"black"} value={value}
                    onChangeText={onChangeText} />
            </View>
            <TouchableOpacity onPress={onPress} style={styles.removeBox}>
                <Icon name="remove-circle" size={16} color={"red"} />
                <Text style={styles.removeText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default SearchFilter2;