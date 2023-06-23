import React from "react";
import { View, Text } from "react-native";
import styles from "./MovSerCardStyles";

function MovSerCard() {
    return (
        <View style={styles.card} >
            <Text style={styles.textMovie}> Harry Potter </Text>
            <View style={styles.horizontalSeperator} />
            <View style={styles.topCard}>
                <Text style={styles.textPlatform}>Platform: </Text>
                 <View style={styles.verticalSeperator} />
                <Text style={styles.textCategory}>Kategori.. </Text>
            </View>
            <View style={styles.horizontalSeperator} />
            <Text style={styles.text}>Not: </Text>
        </View>
    )
};

export default MovSerCard;