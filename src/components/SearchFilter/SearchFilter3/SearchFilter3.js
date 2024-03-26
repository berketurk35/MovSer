import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./SearchFilter3Styles";

import Icon from "react-native-vector-icons/FontAwesome5";

function SearchFilter3({ placeholder, value, onChangeText, onPress, text }) {
    return (
        <View style={styles.filterContainer} >
            <View style={styles.search} >
                <Icon name="search" size={16} color={"black"} style={styles.icon} />
                <TextInput style={styles.textInput} fontSize={12} placeholder={placeholder} placeholderTextColor={"black"} value={value}
                    onChangeText={onChangeText} />
            </View>
            <TouchableOpacity onPress={onPress} style={styles.shareBox}>
                <Icon name="share-square" size={20} color={"green"} />
                <Text style={styles.shareText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default SearchFilter3;