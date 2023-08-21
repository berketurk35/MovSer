import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from "./FriendListCardStyles";

function FriendListCard({ id, cardName, listType, onPressDetail }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressDetail} activeOpacity={1}  >
                <View style={styles.image}>
                    <Text style={styles.image}> Heyyo</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Text style={styles.cardName}>{cardName}</Text>
                <Text style={styles.cardName}>{listType}</Text>
            </View>
        </View>
    )
};

export default FriendListCard;
