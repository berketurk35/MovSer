import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import Translations from '../../../languages/Translation';
import { useStats } from '../../../Context/StatContext';

import styles from "./FriendListCardStyles";

function FriendListCard({ id, cardName, listType, onPressDetail, cardMessage, fullName }) {

    const { language, setLanguage } = useStats();

    return (
        <View style={styles.container}>
            <View style={styles.containerBox}>
            <TouchableOpacity onPress={onPressDetail} activeOpacity={1}  >
                <ImageBackground source={require("../../../images/11.png")} style={styles.card}>
                    <Text style={styles.cardName}>{cardName}</Text>
                    <View style={styles.separator} />
                    <Text style={styles.cardMessageTitle}>{Translations[language].cardMessage}</Text>
                    <Text style={styles.cardMessage}>"{cardMessage}"</Text>
                    <View style={styles.separator} />
                    <Text style={styles.fullName} >{fullName}</Text>
                    <View style={styles.typeBox} >
                        <Text style={styles.typeText}>{listType}s</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        </View>
        
    )
};

export default FriendListCard;
