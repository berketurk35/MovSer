import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from "./FriendListCardStyles";

function FriendListCard({ id, cardName, listType, onPressDetail, cardMessage, fullName }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressDetail} activeOpacity={1}  >
                <View style={styles.card}>
                    <Text style={styles.cardInfo} > {fullName} ' ten {'\n'} {listType} Listesi </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.infoBox} >
                <Text style={styles.cardName}>{cardName}</Text>
                <View style={styles.separator} />
                <Text style={styles.cardMessageTitle}>Kart Mesajı : </Text>
                <Text style={styles.cardMessage}>{cardMessage} </Text>
            </View>
        </View>
    )
};

export default FriendListCard;
