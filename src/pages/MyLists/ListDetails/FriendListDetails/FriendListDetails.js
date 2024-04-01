import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from "react-native";

import styles from "./FriendListDetailsStyles";

import MoviesCard from "../../../../components/Card/MoviesCard/MoviesCard";

import Translations from "../../../../languages/Translation";
import { useStats } from "../../../../Context/StatContext";

import CustomHeader from "../../../../components/Header/CustomHeader";
import SearchFilter1 from "../../../../components/SearchFilter/SearchFilter1/SearchFilter1";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';

function FriendListDetails({ navigation, route }) {

    const { listName, listType, uId, contentIds } = route.params;

    const [savedMovies, setSavedMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [listNameAsync, setListNameAsync] = useState("");

    const [moviesDetails, setMoviesDetails] = useState([]);

    const { language, setLanguage } = useStats();

    useEffect(() => {
        const fetchSavedLists = async () => {

            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + listName + uId);
                setListNameAsync(asyncKey);

                const movies = await AsyncStorage.getItem(listNameAsync);
                if (movies) {
                    setSavedMovies(JSON.parse(movies));
                }
            } catch (error) {
                console.log('Hata: ', error);
            }

            const detailsPromises = contentIds.map(async (contentId) => {
                try {
                    const response = await axios.get(`${BASE_URL}/movie/${contentId}`, {
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
            setMoviesDetails(details.filter(detail => detail !== null));
        };
        fetchSavedLists();
    }, [listNameAsync, contentIds]);

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours} h ${remainingMinutes} m`;
    };

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
            <CustomHeader onPress={back} listName={listName} />
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <SearchFilter1
                    placeholder={Translations[language].filterMovie}
                    value={searchMovie}
                    onChangeText={setSearchMovie}
                />
                <ScrollView>
                    <View style={styles.content}>
                        {moviesDetails.filter(
                            (movie) =>
                                movie.title.toLowerCase().includes(searchMovie.toLowerCase())
                        ).map((movie, index) => (
                            <MoviesCard
                                key={movie.id}
                                movieName={movie.title}
                                date={formatDate(movie.release_date)}
                                vote={movie.vote_average.toFixed(1)}
                                category={movie.genres.map(genre => genre.name).join(', ')}
                                poster={movie.poster_path}
                                time={formatDuration(movie.runtime)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

export default FriendListDetails;

