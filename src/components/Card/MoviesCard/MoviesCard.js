import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./MoviesCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function MoviesCard({ movieName, date, vote, category, poster, time, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.card} >
                <View style={styles.topCard} >
                    <View style={styles.poster} >
                        <Image
                            source={{ uri: `${IMAGE_BASE_URL}${poster}` }}
                            resizeMode="center"
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.rightCard}>
                        <View style={styles.movieNameCard} >
                            <Text style={styles.textMovie} >
                                {movieName}
                            </Text>
                        </View>
                        <Text style={styles.textCategory}>
                            {category}
                        </Text>
                        <View style={styles.topCard}>
                            <Icon name={"date-range"} color={"yellow"} size={16} style={styles.icon} />
                            <Text style={styles.textDate}>
                                {date}
                            </Text>
                            <Text style={styles.textDate}>
                                |    {time}
                            </Text>
                        </View>
                        <View style={styles.topCard} >
                            <Icon name={"star"} color={"green"} size={16} style={styles.icon} />
                            <Text style={styles.textVote}>
                                {vote}
                            </Text>
                        </View>


                    </View>

                </View>
            </View>
        </TouchableOpacity>

    )
};

export default MoviesCard;