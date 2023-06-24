import React from "react";
import { View, Text } from "react-native";
import styles from "./MovSerCardStyles";

function MovSerCard({movieName, platform, category, note}) {
    return (
        <View style={styles.card} >
            <Text style={styles.textMovie}> {movieName} </Text>
            <View style={styles.horizontalSeperator} />
            <View style={styles.topCard}>
                <Text style={styles.textPlatform}>Platform: {platform} </Text>
                 <View style={styles.verticalSeperator} />
                <Text style={styles.textCategory}> {category} </Text>
            </View>
            <View style={styles.horizontalSeperator} />
            <Text style={styles.text}>Not: {note} </Text>
        </View>
    )
};

export default MovSerCard;