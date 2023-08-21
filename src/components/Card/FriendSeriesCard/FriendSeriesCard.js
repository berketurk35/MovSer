import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./FriendSeriesCardStyles";
import Translations from "../../../languages/Translation";
import { useStats } from "../../../Context/StatContext";

import Icon from "react-native-vector-icons/MaterialIcons";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

function FriendSeriesCard({ serieName, releaseDate, vote, category, poster, finalDate, seasons, episodes }) {

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

    const { language, setLanguage} = useStats();

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
                        {formattedSerieName}
                    </Text>
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
                            {seasons} {Translations[language].season}
                        </Text>
                        <Text style={styles.textSeasons}>
                            |    {episodes} {Translations[language].episode}
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

export default FriendSeriesCard;
