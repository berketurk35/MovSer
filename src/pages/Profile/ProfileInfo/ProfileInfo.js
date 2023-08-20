import React from "react";
import { useStats } from "../../../Context/StatContext";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Translations from "../../../languages/Translation";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./ProfileInfoStyles";

function ProfileInfo() {

    const { movieCounter, reqMovieCounter, serieCounter, activeSerieCounter, reqSerieCounter, movieListCounter, serieListCounter, language, setLanguage } = useStats();

    const changeLanguage = async () => {
        const newLanguage = language === "en" ? "tr" : "en";

        try {
            await AsyncStorage.setItem("language", newLanguage);
            setLanguage(newLanguage);
            console.log('Veri güncellendi.');
        } catch (error) {
            console.error('Veri güncellenirken hata oluştu:', error);
        }
    };

    return (
        <View style={styles.container} >
            <View style={styles.row}>
                <Image source={{ uri: "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg" }} resizeMode="stretch" style={styles.image} />
                <View style={{ flex: 2 }} >
                    <Text style={styles.userName} >@GuestUser</Text>
                    <View style={styles.seperator} />
                    <Text style={styles.fullName}> Misafir </Text>
                    <View style={{flexDirection: "row"}} >
                        <TouchableOpacity style={styles.editBox}>
                            <Text style={styles.editTitle} >Profili Düzenle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutBox}>
                            <Text style={styles.editTitle} >Çıkış Yap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={changeLanguage} style={styles.languageBox}>
                    {language === "en" ? (
                        <Image source={require("../../../images/eng.png")} style={styles.langImg} />
                    ) : (
                        <Image source={require("../../../images/tr.png")} style={styles.langImg} />
                    )
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.seperator2} />
            <View style={styles.body} >
                <Text style={styles.title}>{Translations[language].stats}</Text>

                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].moviesTitle1} : {movieCounter} </Text>
                    <Text style={styles.text}>{Translations[language].moviesTitle2} : {reqMovieCounter}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].seriesTitle1} : {serieCounter}</Text>
                    <Text style={styles.text}>{Translations[language].seriesTitle2} : {activeSerieCounter}</Text>
                    <Text style={styles.text}>{Translations[language].seriesTitle3} : {reqSerieCounter}</Text>
                </View>
                <View style={styles.box2}>
                    <Text style={styles.text}>{Translations[language].listTitle1} : {movieListCounter}</Text>
                    <Text style={styles.text}>{Translations[language].listTitle2} : {serieListCounter}</Text>
                </View>
                <TouchableOpacity onPress={null} style={styles.removeDataBox} >
                    <Text style={styles.removeDataText} >Veriyi Sil</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ProfileInfo;
