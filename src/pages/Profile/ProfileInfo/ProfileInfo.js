import React from "react";
import { useStats } from "../../../Context/StatContext";
import { View, Text, Image } from "react-native";
import Translations from "../../../languages/Translation";

import styles from "./ProfileInfoStyles";

function ProfileInfo() {

    const { movieCounter,reqMovieCounter,serieCounter,activeSerieCounter,reqSerieCounter,movieListCounter,serieListCounter,language} = useStats();

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
                <Text style={styles.title}>{Translations[language].stats}</Text>
                <View style={styles.fBox}>
                    <Text style={styles.text}>{Translations[language].stats} : 5</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].moviesTitle1} : {movieCounter} </Text>
                    <Text style={styles.text}>{Translations[language].moviesTitle2} : {reqMovieCounter}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].seriesTitle1} : {serieCounter}</Text>
                    <Text style={styles.text}>{Translations[language].seriesTitle2} : {activeSerieCounter}</Text>
                    <Text style={styles.text}>{Translations[language].seriesTitle3} : {reqSerieCounter}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].listTitle1} : {movieListCounter}</Text>
                    <Text style={styles.text}>{Translations[language].listTitle2} : {serieListCounter}</Text>
                </View>
            </View>
        </View>
    )
};

export default ProfileInfo;
