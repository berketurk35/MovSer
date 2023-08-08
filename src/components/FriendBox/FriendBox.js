import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./FriendBoxStyles";

import Icon from "react-native-vector-icons/Ionicons";

function FriendBox() {

    return (
        <View>
            <View style={styles.container} >
                <Image source={require("../../images/pp.jpeg")} style={styles.image} />
                <View style={styles.textBody}>
                    <Text style={styles.userName}>berkee.turk </Text>
                    <Text style={styles.fullName}>Berke Türk</Text>
                </View>
            </View>
            <View style={styles.seperator} />
        </View>
    )
};

export default FriendBox;