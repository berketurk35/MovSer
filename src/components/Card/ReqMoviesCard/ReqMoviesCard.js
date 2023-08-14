import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./ReqMoviesCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function ReqMoviesCard({ savedDate, movieName, date, vote, category, poster, time, onPressAdd, onPressDelete, iconName }) {

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
                    <Text style={styles.instaDate} >{savedDate}</Text>
                    <View style={styles.movieNameCard} >
                        <Text style={styles.textMovie} >
                            {formattedMovieName}
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
                    </View>
                </View>
                <TouchableOpacity onPress={onPressAdd} style={styles.icon2}>
                    <Icon name={iconName} color={"green"} size={16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressDelete} style={styles.icon3}>
                    <Icon name={"cancel"} color={"#ff675c"} size={16} />
                </TouchableOpacity>
            </View>
        </View>

    )
};

export default ReqMoviesCard;
