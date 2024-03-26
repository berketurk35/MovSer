import React from 'react'
import { View, Text } from 'react-native';
import styles from "./CustomHeaderStyles";
import Icon from "react-native-vector-icons/Ionicons";

function CustomHeader({onPress, listName}) {
    return (
        <View style={styles.customHeader}>
            <Icon name="arrow-back" size={22} color={"white"} style={styles.backIcon} onPress={onPress} />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{listName}</Text>
            </View>
            <View style={{ flex: 0.5 }} />
        </View>
    )
};

export default CustomHeader;