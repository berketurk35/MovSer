import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./ProfileInfoStyles";

function ProfileInfo() {
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
                <Text style={styles.title}>Stats</Text>
                <View style={styles.fBox}>
                    <Text style={styles.text}>Friends : 5</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Watched Films : 12</Text>
                    <Text style={styles.text}>Movies To Watch : 4</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Watched Series : 15</Text>
                    <Text style={styles.text}>Watching Now : 2</Text>
                    <Text style={styles.text}>Series To Watch : 12</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Movies List : 4</Text>
                    <Text style={styles.text}>Series List : 5</Text>
                </View>
            </View>
        </View>
    )
};

export default ProfileInfo;