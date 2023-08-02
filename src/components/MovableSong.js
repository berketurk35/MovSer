import React, { useState } from 'react';
import { View, Image, Text, useWindowDimensions } from "react-native";
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

const SONG_HEIGHT = 70;
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;

function Song({ artist, cover, title }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 70,
                padding: 10,
            }}
        >
            <Image
                source={{ uri: cover }}
                style={{ height: 50, width: 50, borderRadius: 4 }}
            />

            <View
                style={{
                    marginLeft: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 4,
                    }}
                >
                    {title}
                </Text>

                <Text style={{ fontSize: 12, color: 'gray' }}>{artist}</Text>
            </View>
        </View>
    );
}

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

function MovableSong({
    id,
    artist,
    cover,
    title,
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
                <Animated.View style={{ maxWidth: '80%' }}>
                    <Song artist={artist} cover={cover} title={title} />
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};

export default MovableSong;

