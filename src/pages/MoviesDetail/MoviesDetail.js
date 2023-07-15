import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./MoviesDetailStyles";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function MoviesDetail({ route }) {
    const { selectedMovie } = route.params;

    console.log(selectedMovie);

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${IMAGE_BASE_URL}${selectedMovie.moviePoster}` }} resizeMode="stretch" style={styles.image} />
            <View style={styles.body}>
                <Text style={styles.title}> {selectedMovie.movieName} </Text>
            </View>

        </View>
    );
}

export default MoviesDetail;
