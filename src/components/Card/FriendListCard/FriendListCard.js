import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

import Translations from '../../../languages/Translation';
import { useStats } from '../../../Context/StatContext';

import styles from "./FriendListCardStyles";

function FriendListCard({ id, cardName, listType, onPressDetail, cardMessage, fullName }) {

    const { language, setLanguage } = useStats();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressDetail} activeOpacity={1}  >
                <ImageBackground source={require("../../../images/1.png")} style={styles.card}>
                    <Text style={styles.cardMessageTitle}>{Translations[language].cardMessage}</Text>
                    <Text style={styles.cardMessage}>{cardMessage} </Text>
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.infoBox} >
                <Text style={styles.cardName}>{cardName}</Text>
                <View style={styles.separator} />
                <View style={{flex:1, justifyContent: "center"}}>
                    <Text style={styles.cardInfo} > {fullName} {Translations[language].ten} {'\n'} {listType} {Translations[language].list} </Text>
                </View>

            </View>
        </View>
    )
};

export default FriendListCard;
