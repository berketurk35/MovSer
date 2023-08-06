import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./ReqSeriesCardStyles";

import Icon from "react-native-vector-icons/MaterialIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function ReqSeriesCard({ serieName, releaseDate, instaDate, vote, category, poster, finalDate, onPressList, onPressDelete, iconName, seasons, episodes }) {

    function formatSerieName(name, maxLength) {
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength - 3) + '...';
        }
    }

    const sName = serieName;
    const maxLengthToShow = 34;

    const formattedSerieName = formatSerieName(sName, maxLengthToShow);

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
                    <Text style={styles.instaDate} >{instaDate}</Text>
                    <View style={styles.movieNameCard} >
                        <Text style={styles.textMovie} >
                            {formattedSerieName}
                        </Text>
                    </View>
                    <Text style={styles.textCategory}>
                        {category}
                    </Text>
                    <View style={styles.topCard}>
                        <Icon name={"date-range"} color={"yellow"} size={16} style={styles.icon} />
                        <Text style={styles.textDate}>
                            {releaseDate}
                        </Text>
                        <Text style={styles.textDate}>
                            |    {finalDate}
                        </Text>
                    </View>
                    <View style={styles.topCard}>
                        <Icon name={"analytics"} color={"pink"} size={16} style={styles.icon} />
                        <Text style={styles.textSeasons}>
                            {seasons} Season
                        </Text>
                        <Text style={styles.textSeasons}>
                            |    {episodes} Episode
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
                    <TouchableOpacity onPress={onPressList} style={styles.icon2}>
                        <Icon name={iconName} color={"green"} size={16} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDelete} style={styles.icon3}>
                        <Icon name={"cancel"} color={"red"} size={16} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
};

export default ReqSeriesCard;
