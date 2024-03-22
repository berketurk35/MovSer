import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./FabStyles";

function Fab({onPress, text}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.fab}>
            <Icon style={styles.fabIcon} name="add" size={24} color={"white"} />
            <Text style={styles.fabColor} >{text}</Text>
        </TouchableOpacity>
    )
};

export default Fab;