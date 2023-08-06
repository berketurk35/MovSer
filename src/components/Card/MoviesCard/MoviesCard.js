import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./MoviesCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function MoviesCard({ movieName, date, vote, category, poster, time, onPressList, onPressDelete, iconName }) {

    function formatMovieName(name, maxLength) {
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength - 3) + '...';
        }
    }

    const sName = movieName;
    const maxLengthToShow = 34;

    const formattedMovieName = formatMovieName(sName, maxLengthToShow);

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
                    <TouchableOpacity onPress={onPressDelete} style={styles.icon2}>
                        <Icon name={"cancel"} color={"#ff675c"} size={16} />
                    </TouchableOpacity>
                    <Text style={styles.textMovie} >
                        {formattedMovieName}
                    </Text>
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
                    </View>
                </View>
            </View>
        </View>

    )
};

export default MoviesCard;
