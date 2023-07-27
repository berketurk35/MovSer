import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./ListCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

function ListCard({ cardName, onPressDelete }) {
    return (
        <View style={styles.container} >
            <View style={styles.cardTop} >
                <Text style={styles.cardName} > {cardName} </Text>
                <TouchableOpacity onPress={onPressDelete} style={styles.iconDel}>
                    <Icon name={"cancel"} color={"red"} size={18} />
                </TouchableOpacity>
            </View>
            <Image source={require("../../../images/netflix.png")} style={styles.image} />
        </View>
    )
};

export default ListCard;