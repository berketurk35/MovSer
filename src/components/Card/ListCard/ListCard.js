import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
    cancelAnimation,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import styles from "./ListCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

const SONG_HEIGHT = 230;
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;

function Card({cardName, onPressDelete, imageName, onPressDetail }) {

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

function clamp(value, lowerBound, upperBound) {
    'worklet';
    return Math.max(lowerBound, Math.min(value, upperBound));
}

function objectMove(object, from, to) {
    'worklet';
    const newObject = Object.assign({}, object);

    for (const id in object) {
        if (object[id] === from) {
            newObject[id] = to;
        }

        if (object[id] === to) {
            newObject[id] = from;
        }
    }

    return newObject;
}

function ListCard({
    id,
    cardName,
    onPressDelete,
    imageName,
    onPressDetail,
    positions,
    scrollY,
    songsCount,
}) {
    const dimensions = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const [moving, setMoving] = useState(false);
    const top = useSharedValue(positions.value[id] * SONG_HEIGHT);

    useAnimatedReaction(
        () => positions.value[id],
        (currentPosition, previousPosition) => {
            if (currentPosition !== previousPosition) {
                if (!moving) {
                    top.value = withSpring(currentPosition * SONG_HEIGHT);
                }
            }
        },
        [moving]
    );

    const gestureHandler = useAnimatedGestureHandler({
        onStart() {
            runOnJS(setMoving)(true);
        },
        onActive(event) {
            const positionY = event.absoluteY + scrollY.value;

            if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
                // Scroll up
                scrollY.value = withTiming(0, { duration: 1500 });
            } else if (
                positionY >=
                scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD
            ) {
                // Scroll down
                const contentHeight = songsCount * SONG_HEIGHT;
                const containerHeight =
                    dimensions.height - insets.top - insets.bottom;
                const maxScroll = contentHeight - containerHeight;
                scrollY.value = withTiming(maxScroll, { duration: 1500 });
            } else {
                cancelAnimation(scrollY);
            }

            top.value = withTiming(positionY - SONG_HEIGHT, {
                duration: 16,
            });

            const newPosition = clamp(
                Math.floor(positionY / SONG_HEIGHT),
                0,
                songsCount - 1
            );

            if (newPosition !== positions.value[id]) {
                positions.value = objectMove(
                    positions.value,
                    positions.value[id],
                    newPosition
                );
            }
        },
        onFinish() {
            top.value = positions.value[id] * SONG_HEIGHT;
            runOnJS(setMoving)(false);
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            left: 0,
            right: 0,
            top: top.value,
            zIndex: moving ? 1 : 0,
            shadowColor: 'black',
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowOpacity: withSpring(moving ? 0.2 : 0),
            shadowRadius: 10,
        };
    }, [moving]);

    return (
        <Animated.View style={animatedStyle}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={{ maxWidth: '90%' }}>
                    <Card cardName={cardName} imageName={imageName} onPressDelete={onPressDelete} onPressDetail={onPressDetail} />
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};

export default ListCard;
