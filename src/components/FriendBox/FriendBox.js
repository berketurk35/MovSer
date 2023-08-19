import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./FriendBoxStyles";

import Icon from "react-native-vector-icons/Ionicons";

function FriendBox({profilePhoto, userName, fullName}) {

    return (
        <View>
            <View style={styles.container} >
                <Image source={{uri: profilePhoto}} style={styles.image} />
                <View style={styles.textBody}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.fullName}>{fullName}</Text>
                </View>
            </View>
            <View style={styles.seperator} />
        </View>
    )
};

export default FriendBox;