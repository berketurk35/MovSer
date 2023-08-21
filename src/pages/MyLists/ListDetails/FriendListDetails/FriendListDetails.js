import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from "react-native";

import styles from "./FriendListDetailsStyles";

import MovSerCard from "../../../../components/Card/MoviesCard/MoviesCard";

import Icon from "react-native-vector-icons/Ionicons";

import Translations from "../../../../languages/Translation";
import { useStats } from "../../../../Context/StatContext";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function FriendListDetails({ navigation, route }) {

    const { listName, listType, uId, contentIds } = route.params;

    const [savedMovies, setSavedMovies] = useState([]);
    const [categoryText, setCategoryText] = useState("");
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
                    
                    // Kategori adlarını al
                    const genreNames = await fetchGenreNames(response.data.genres);
                    console.log("ne var?", response.data.genres);
                    // Gelen filmin özelliklerini genişleterek genreNames eklemesi yap
                    const movieWithGenres = {
                        ...response.data,
                        genre_names: genreNames,
                    };

                    return movieWithGenres;
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

    const fetchGenreNames = async (genreIds) => {
        try {
            const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
                params: {
                    api_key: API_KEY,
                },
            });

            const genres = response.data.genres;
            const names = genreIds.map((genreId) => {
                const genre = genres.find((g) => g.id === genreId);
                return genre ? genre.name : '';
            });

            return names;
        } catch (error) {
            console.error(error);
            return [];
        }
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
                        <TextInput style={{ fontSize: 13 }} placeholder={Translations[language].filterMovie} placeholderTextColor={"black"} value={searchMovie}
                            onChangeText={setSearchMovie} />
                    </View>
                </View>
                <View style={styles.seperator} />
                <ScrollView>
                    <View style={styles.content}>
                        {moviesDetails.map((movie, index) => (
                            <MovSerCard
                                key={movie.id}
                                movieName={movie.title}
                                date={movie.release_date}
                                vote={movie.vote_average}
                                category={categoryText}
                                poster={movie.poster_path}
                                time={movie.runtime}
                                onPressDelete={null}
                            />
                        ))}
                    </View>
                </ScrollView>


            </KeyboardAvoidingView>

        </SafeAreaView>
    )
};

export default FriendListDetails;

