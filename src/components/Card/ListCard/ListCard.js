import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./ListCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

function ListCard({ cardName, onPressDelete, imageName, onPressDetail }) {

    const Images = {
        netflix: require("../../../images/netflix.png"),
        prime: require("../../../images/prime.png"),
        disney: require("../../../images/disney.png"),
        blutv: require("../../../images/blutv.png"),
        mubi: require("../../../images/mubi.png"),
        exxen: require("../../../images/exxen.png"),
        appletv: require("../../../images/appletv.png"),
        hbo: require("../../../images/hbo.png"),
        1: require("../../../images/1.png"),
        2: require("../../../images/2.png"),
        3: require("../../../images/3.png"),
        4: require("../../../images/4.png"),
        5: require("../../../images/5.png"),
        6: require("../../../images/6.png"),
        7: require("../../../images/7.png"),
        8: require("../../../images/8.png"),
        9: require("../../../images/9.png"),
        10: require("../../../images/10.png"),
        11: require("../../../images/11.png"),
        12: require("../../../images/12.png"),
    };

    return (
        <View style={styles.container} >
            <View style={styles.cardTop} >
                <Text style={styles.cardName} > {cardName} </Text>
                <TouchableOpacity onPress={onPressDelete} style={styles.iconDel}>
                    <Icon name={"cancel"} color={"red"} size={18} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPressDetail}  >
                <Image source={Images[imageName]} style={styles.image} />
            </TouchableOpacity>
        </View>
    )
};

export default ListCard;
