import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RemoveCardStyles";

import { useStats } from "../../../Context/StatContext";

import Icon from "react-native-vector-icons/MaterialIcons";

function RemoveCard({ name, onPressDelete }) {

    const { language, setLanguage } = useStats();

    return (
        <View style={styles.container} >
            <Text style={styles.cardName}>{name}</Text>
            <TouchableOpacity onPress={onPressDelete} style={styles.icon}>
                <Icon name={"cancel"} color={"#ff675c"} size={16} />
            </TouchableOpacity>
        </View>

    )
};

export default RemoveCard;