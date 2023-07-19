import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./MoviesCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function MoviesCard({ movieName, date, vote, category, poster, time, onPressList, onPressDelete, iconName }) {
    return (
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
                        <View style={{ flexDirection: "row", flex: 1 }} >
                            <Icon name={"star"} color={"green"} size={16} style={styles.icon} />
                            <Text style={styles.textVote}>
                                {vote}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onPressList} style={styles.icon2}>
                            <Icon name={iconName} color={"green"} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressDelete} style={styles.icon2}>
                            <Icon name={"cancel"} color={"red"} size={18} />
                        </TouchableOpacity>

                    </View>


                </View>

            </View>
        </View>

    )
};

export default MoviesCard;
