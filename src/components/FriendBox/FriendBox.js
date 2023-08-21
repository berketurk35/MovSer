import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./FriendBoxStyles";

import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";

function FriendBox({ profilePhoto, userName, fullName, pressAccept, pressReject,pressShare, iconName1, iconName2, iconShare }) {

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
                        <Icon2 name={iconShare} size={22} color={"black"} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pressAccept} >
                        <Icon name={iconName1} size={16} color={"green"} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pressReject}>
                        <Icon name={iconName2} size={16} color={"red"} style={styles.icon} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.seperator} />
        </View>
    )
};

export default FriendBox;