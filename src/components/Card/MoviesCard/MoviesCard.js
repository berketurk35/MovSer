import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./MoviesCardStyles";
import { colors } from "../../../colors/colors";

import Icon from "react-native-vector-icons/MaterialIcons";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function MoviesCard({ movieName, date, vote, category, poster, time, onPressDelete, iconDelete }) {

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
                    <Text style={styles.textMovie} >
                        {formattedMovieName}
                    </Text>
                    <Text style={styles.textCategory}>
                        {category}
                    </Text>
                    <View style={styles.topCard}>
                        <Icon name={"date-range"} color={colors.secondary} size={16} style={styles.icon} />
                        <Text style={styles.textDate}>
                            {date}
                        </Text>
                        <Text style={styles.textDate}>
                            |    {time}
                        </Text>
                    </View>
                    <View style={styles.topCard} >
                        <View style={{ flexDirection: "row", flex: 1 }} >
                            <Icon name={"star"} color={colors.textVote} size={16} style={styles.icon} />
                            <Text style={styles.textVote}>
                                {vote}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={onPressDelete} style={styles.icon2}>
                    <Iconx name={iconDelete} color={colors.delete} size={16} /> 
                </TouchableOpacity>
            </View>
        </View>

    )
};

export default MoviesCard;
