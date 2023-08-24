import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from "react-native";

import styles from "./FriendListDetails2Styles";

import FriendSeriesCard from "../../../../components/Card/FriendSeriesCard/FriendSeriesCard";

import Icon from "react-native-vector-icons/Ionicons";

import Translations from "../../../../languages/Translation";
import { useStats } from "../../../../Context/StatContext";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';

function FriendListDetails2({ navigation, route }) {

    const { listName, listType, uId, contentIds } = route.params;

    const [savedSeries, setSavedSeries] = useState([]);
    const [searchSerie, setSearchSerie] = useState('');
    const [listNameAsync, setListNameAsync] = useState("");

    const [seriesDetails, setSeriesDetails] = useState([]);

    const { language, setLanguage } = useStats();

    useEffect(() => {
        const fetchSavedLists = async () => {

            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + listName + uId);
                setListNameAsync(asyncKey);

                const series = await AsyncStorage.getItem(listNameAsync);
                if (series) {
                    setSavedSeries(JSON.parse(series));
                }
            } catch (error) {
                console.log('Hata: ', error);
            }

            const detailsPromises = contentIds.map(async (contentId) => {
                try {
                    const response = await axios.get(`${BASE_URL}/tv/${contentId}`, {
                        params: {
                            api_key: API_KEY,
                        },
                    });
                    return response.data;

                } catch (error) {
                    console.error(error);
                    return null;
                }
            });

            const details = await Promise.all(detailsPromises);
            setSeriesDetails(details.filter(detail => detail !== null));
        };
        fetchSavedLists();
    }, [listNameAsync, contentIds]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('tr-TR');

        return formattedDate;
    };

    function back() {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.customHeader}>
                <Icon name="arrow-back" size={22} color={"black"} style={styles.backIcon} onPress={back} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{listName}</Text>
                </View>
                <View style={{ flex: 0.5 }} />
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                    <View style={styles.search} >
                        <Icon name="search" size={18} color={"black"} style={styles.icon} />
                        <TextInput style={{ fontSize: 13, flex: 1 }} placeholder={Translations[language].filterSerie} placeholderTextColor={"black"} value={searchSerie}
                            onChangeText={setSearchSerie} />
                    </View>
                </View>
                <View style={styles.seperator} />
                <ScrollView>
                    <View style={styles.content}>
                        {seriesDetails.filter(
                            (serie) =>
                                serie.name.toLowerCase().includes(searchSerie.toLowerCase())
                        ).map((serie, index) => (
                            <FriendSeriesCard
                                key={serie.id}
                                serieName={serie.name}
                                releaseDate={formatDate(serie.first_air_date)}
                                finalDate={formatDate(serie.last_air_date)}
                                vote={serie.vote_average.toFixed(1)}
                                category={serie.genres.map(genre => genre.name).join(', ')}
                                poster={serie.poster_path}
                                seasons={serie.number_of_seasons}
                                episodes={serie.number_of_episodes}
                            />
                        ))}
                    </View>
                </ScrollView>


            </KeyboardAvoidingView>

        </SafeAreaView>
    )
};

export default FriendListDetails2;

