import React from "react";
import { View, Text } from "react-native";
import styles from "./SeriesCardStyles";

function SeriesCard({seriesName, platform, seaons, isFinal, category, note}) {
    return (
        <View style={styles.card} >
            <Text style={styles.textMovie}> {seriesName} </Text>
            <View style={styles.horizontalSeperator} />
            <View style={styles.topCard}>
                <Text style={styles.textTop}>{platform} </Text>
                 <View style={styles.verticalSeperator} />
                 <Text style={styles.textTop}>{seaons} </Text>
                 <View style={styles.verticalSeperator} />
                <Text style={styles.textTop}> {category} </Text>
                <View style={styles.verticalSeperator} />
                <Text style={styles.textTop}> {isFinal} </Text>
            </View>
            <View style={styles.horizontalSeperator} />
            <Text style={styles.text}>Not: {note} </Text>
        </View>
    )
};

export default SeriesCard;