import React from 'react'
import { View, TextInput } from 'react-native';
import styles from "./SearchFilter1Styles";

import Icon from "react-native-vector-icons/Ionicons";

function SearchFilter1({placeholder,value,onChangeText}) {
    return (
        <View style={styles.filterContainer} >
            <View style={styles.search} >
                <Icon name="search" size={16} color={"black"} style={styles.icon} />
                <TextInput style={styles.textInput} fontSize={12} placeholder={placeholder} placeholderTextColor={"black"} value={value}
                    onChangeText={onChangeText} />
            </View>
        </View>
    )
};

export default SearchFilter1;