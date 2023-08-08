import React from "react";
import { useStats } from "../../../Context/StatContext";
import { View, Text, Image } from "react-native";

import styles from "./ProfileInfoStyles";

function ProfileInfo() {

    const { movieCounter,reqMovieCounter,serieCounter,activeSerieCounter,reqSerieCounter,movieListCounter,serieListCounter} = useStats();

    return (
        <View style={styles.container} >
            <View style={styles.row}>
                <Image source={require("../../../images/pp.jpeg")} resizeMode="stretch" style={styles.image} />
                <View style={{ flex: 2 }} >
                    <Text style={styles.userName} >@berkee.turk</Text>
                    <View style={styles.seperator} />
                    <Text style={styles.fullName}>Berke Türk </Text>
                </View>
            </View>
            <View style={styles.seperator2} />
            <View style={styles.body} >
                <Text style={styles.title}>Stats</Text>
                <View style={styles.fBox}>
                    <Text style={styles.text}>Friends : 5</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Watched Films : {movieCounter} </Text>
                    <Text style={styles.text}>Movies To Watch : {reqMovieCounter}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Watched Series : {serieCounter}</Text>
                    <Text style={styles.text}>Watching Now : {activeSerieCounter}</Text>
                    <Text style={styles.text}>Series To Watch : {reqSerieCounter}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Movies List : {movieListCounter}</Text>
                    <Text style={styles.text}>Series List : {serieListCounter}</Text>
                </View>
            </View>
        </View>
    )
};

export default ProfileInfo;
