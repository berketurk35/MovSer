import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./FriendBoxShareStyles";

import Icon from "react-native-vector-icons/FontAwesome";

function FriendBoxShare({ profilePhoto, userName, fullName, pressShare, iconShare }) {

    return (
        <View>
            <View style={styles.container} >
                <Image source={{ uri: profilePhoto }} style={styles.image} />
                <View style={styles.textBody}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.fullName}>{fullName}</Text>
                </View>
                <View style={styles.iconBox}>
                    <TouchableOpacity onPress={pressShare} >
                        <Icon name={iconShare} size={22} color={"black"} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.seperator} />
        </View>
    )
};

export default FriendBoxShare;