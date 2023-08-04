import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MovableSong from '../components/MovableSong';
import { Text } from 'react-native';


function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function listToObject(list) {
    const values = Object.values(list);
    const object = {};

    for (let i = 0; i < values.length; i++) {
        object[values[i].id] = i;
    }
    return object;
}

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

const SONGS = shuffle([
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
]);

const SONG_HEIGHT = 300;


export default function Test({navigation}) {
    const positions = useSharedValue(listToObject(SONGS));
    const scrollY = useSharedValue(0);
    const scrollViewRef = useAnimatedRef();

    useAnimatedReaction(
        () => scrollY.value,
        (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
    );

    const handleScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    function git() {
        navigation.navigate("ListeTesti");
    };

    const renderSongs = () => {
        return SONGS.map((song) => (
            <MovableSong
                key={song.id}
                id={song.id}
                artist={song.artist}
                cover={song.cover}
                title={song.title}
                positions={positions}
                scrollY={scrollY}
                songsCount={SONGS.length}
            />
        ));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider >
                <SafeAreaView style={{ flex: 1 }}>
                    <Text onPress={git} >Selam</Text>
                    <Animated.ScrollView
                        ref={scrollViewRef}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        style={{ position: 'relative', backgroundColor: 'white' }}
                        contentContainerStyle={{ height: SONGS.length * SONG_HEIGHT }}
                    >
                        {renderSongs()}

                    </Animated.ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
