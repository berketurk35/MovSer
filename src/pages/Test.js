import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';


const ALBUM_COVERS = {
    DISCOVERY:
        'https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg',
    HUMAN_AFTER_ALL:
        'https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg',
    HOMEWORK:
        'https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg',
    RANDOM_ACCESS_MEMORIES:
        'https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg',
};

const DAFT_PUNK = 'Daft Punk';

const SONGS = [
    {
        id: '1',
        title: 'Veridis Quo',
        artist: DAFT_PUNK,
        cover: ALBUM_COVERS.DISCOVERY,
    },
    {
        id: '2',
        title: 'Make Love',
        artist: DAFT_PUNK,
        cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
    },
    {
        id: '3',
        title: 'Television Rules the Nation',
        artist: DAFT_PUNK,
        cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
    },
    {
        id: '4',
        title: 'Phoenix',
        artist: DAFT_PUNK,
        cover: ALBUM_COVERS.HOMEWORK,
    },
];

export default function Test({ navigation }) {
    const ref = useRef(null);
    const [data, setData] = useState(SONGS);

    const renderItem = ({ item, drag }) => {

        const { isActive } = useOnCellActiveAnimation();

        return (
            <ScaleDecorator>
                <OpacityDecorator activeOpacity={1} >
                    <ShadowDecorator>

                        <TouchableOpacity onLongPress={drag} activeOpacity={1} style={{ elevation: isActive ? 60 : 0, shadowColor: "black", }} >
                            <Text>Bana Basarak Sürükle</Text>

                        </TouchableOpacity>
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 180,
                                padding: 10,
                                backgroundColor: "white"
                            }}>

                            <Image
                                source={{ uri: item.cover }}
                                style={{ height: 150, width: 180, borderRadius: 4 }}
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
                                    {item.title}
                                </Text>

                                <Text style={{ fontSize: 12, color: 'gray' }}>{item.artist}</Text>
                            </View>

                        </Animated.View>
                    </ShadowDecorator>
                </OpacityDecorator>
            </ScaleDecorator>
        );
    };

    console.log(data);

    return (
        <GestureHandlerRootView >
            <DraggableFlatList
                ref={ref}
                data={data}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }) => setData(data)}
                renderItem={renderItem}
            />
        </GestureHandlerRootView>

    );
}
