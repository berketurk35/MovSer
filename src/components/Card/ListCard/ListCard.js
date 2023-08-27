import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';

import Animated from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./ListCardStyles";

function ListCard({
    id,
    cardName,
    imageName,
    onPressDetail,
    onDrag,
}) {

    const Images = {
        netflix: require("../../../images/netflix.png"),
        prime: require("../../../images/prime.png"),
        disney: require("../../../images/disney.png"),
        blutv: require("../../../images/blutv.png"),
        mubi: require("../../../images/mubi.png"),
        exxen: require("../../../images/netflix.png"),
        apptv: require("../../../images/netflix.png"),
        hbmax: require("../../../images/netflix.png"),
        1: require("../../../images/1.png"),
        2: require("../../../images/2.png"),
        3: require("../../../images/3.png"),
        6: require("../../../images/6.png"),
        9: require("../../../images/9.png"),
        10: require("../../../images/10.png"),
        11: require("../../../images/11.png"),
        12: require("../../../images/12.png"),
    };


    const { isActive } = useOnCellActiveAnimation();

    return (
        <ScaleDecorator >
            <OpacityDecorator activeOpacity={1}>
                <ShadowDecorator>
                    <Animated.View>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={onPressDetail} onLongPress={onDrag} activeOpacity={1} style={{ elevation: isActive ? 60 : 0, shadowColor: "black" }} >
                                <Image source={Images[imageName]} style={styles.image} />
                            </TouchableOpacity>
                            <Text style={styles.cardName}>{cardName}</Text>
                        </View>
                    </Animated.View>
                </ShadowDecorator>
            </OpacityDecorator>
        </ScaleDecorator>
    );
};

export default ListCard;
