import React, { useState, useEffect, forwardRef } from "react";
import { useStats } from "../../../Context/StatContext";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import styles from "./MoviesListStyles";

import MovSerCard from "../../../components/Card/MoviesCard/MoviesCard";
import Input from "../../../components/Input/Input";

import Icon from "react-native-vector-icons/Ionicons";
import Translations from "../../../languages/Translation";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function MoviesList({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [duration, setDuration] = useState("");
    const [savedMoviesAsync, setSavedMoviesAsync] = useState("");

    const { movieCounter, setMovieCounter } = useStats();
    const { language, setLanguage } = useStats();

    useEffect(() => {
        const fetchAndSetMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                console.log("userID: ", userID);
                const asyncKey = (userID + "savedMovies");
                setSavedMoviesAsync(asyncKey);
    
                const movies = await AsyncStorage.getItem(savedMoviesAsync);
                if (movies) {
                    setSavedMovies(JSON.parse(movies));
                    setMovieCounter(JSON.parse(movies).length);
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };

        fetchAndSetMovies();
    }, [savedMoviesAsync]);

    useEffect(() => {
        if (route.params && route.params.Movie) {
            const { Movie } = route.params;
    
            // Eğer bir film aktarıldıysa ve daha önce kaydedilmemişse, savedMovies dizisine ekleyin
            const isAlreadyAdded = savedMovies.some(movie => movie.movieId === Movie.movieId);
            if (!isAlreadyAdded) {
                const updatedMovies = [Movie, ...savedMovies];
                setSavedMovies(updatedMovies);
                AsyncStorage.setItem(savedMoviesAsync, JSON.stringify(updatedMovies))
                    .then(() => {
                        console.log("Film başarıyla eklendi.");
                        fetchSavedMovies();
                    })
                    .catch((error) => {
                        console.log("Film eklenirken bir hata oluştu:", error);
                    });
            }
    
            // route.params'ı temizleyin, böylece tekrar açıldığında Movie verisi yok olur
            navigation.setParams({ Movie: null });
        }
    }, [route.params]);
    

    const fetchSavedMovies = async () => {
        try {
            const movies = await AsyncStorage.getItem(savedMoviesAsync);
            if (movies) {
                setSavedMovies(JSON.parse(movies));
            }
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const clearData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Veriler başarıyla sıfırlandı.');
        } catch (error) {
            console.log('Veriler sıfırlanırken bir hata oluştu:', error);
        }
    };

    const handleFabPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSearchResults("");
        setSearchText("");
        setSelectedMovie("");
    };

    const saveMovie = async () => {
        // Verileri bir obje olarak hazırla
        const movieData = {
            movieId: selectedMovie.id,
            movieName: selectedMovie.title,
            movieDate: formatDate(selectedMovie.release_date),
            movieVote: selectedMovie.vote_average.toFixed(1),
            movieCategory: categoryText,
            moviePoster: selectedMovie.poster_path,
            movieTime: duration
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingMovies = await AsyncStorage.getItem(savedMoviesAsync);
            let updatedMovies = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedMovies = JSON.parse(existingMovies);

                const isAlreadyAdded = updatedMovies.some(
                    (movie) => movie.movieId === movieData.movieId
                );

                if (isAlreadyAdded) {
                    console.log("Bu film zaten eklenmiş.");
                    closeModal(); 
                    return;
                }
            }

            // Yeni filmi ekle
            updatedMovies.unshift(movieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(savedMoviesAsync, JSON.stringify(updatedMovies));

            // Kaydedilen filmleri güncelle
            setSavedMovies(updatedMovies);

            // Modalı kapat
            setSearchResults("");
            setSelectedMovie("");
            setSearchText("");
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const searchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: searchText,
                },
            });

            const results = response.data.results.slice(0, 4);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    const getMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                },
            });
            const runtime = response.data.runtime;
            const formattedDuration = formatDuration(runtime);
            setDuration(formattedDuration);

        } catch (error) {
            console.error(error);
        }
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours} h ${remainingMinutes} m`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('tr-TR'); // tr-TR, Türkiye'nin bölgesel kodudur

        return formattedDate;
    };

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

    const handleTextChange = (text) => {
        setSearchText(text);
        searchMovies();
    };

    const handleMovieSelect = async (movie) => {

        setSelectedMovie(movie);
        setSearchText(movie.title);
        getMovieDetails(movie.id);
        // Film tür adlarını al
        const genreNames = await fetchGenreNames(movie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
    };

    const handleSearchBarPress = () => {
        setSelectedMovie(null);
        setGenreNames([]);
    };

    const handleMovieDelete = (movie) => {
        Alert.alert(
            Translations[language].movieDeleteTitle,
            `"${movie.movieName}", ${Translations[language].movieDeleteText}`,
            [
                {
                    text: Translations[language].giveUp,
                    style: 'cancel',
                },
                {
                    text: Translations[language].delete,
                    style: 'destructive',
                    onPress: () => deleteMovie(movie),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteMovie = async (movie) => {
        const updatedMovies = savedMovies.filter((m) => m.movieId !== movie.movieId);
        setSavedMovies(updatedMovies);
        AsyncStorage.setItem(savedMoviesAsync, JSON.stringify(updatedMovies))
            .then(() => {
                console.log('Film başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Film silinirken bir hata oluştu:', error);
            });
    };

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleMovieSelect(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                    style={{ width: 50, height: 75, margin: 10 }}
                />
                <View>
                    <Text>{item.title} </Text>
                    <Text style={{ fontSize: 10, paddingTop: 6 }} >{formatDate(item.release_date)} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <View style={styles.filterContainer} >
                    <View style={styles.search} >
                        <Icon name="search" size={16} color={"black"} style={styles.icon} />
                        <TextInput style={{ fontSize: 13, flex: 1 }} fontSize={12} placeholder={Translations[language].filterMovie} placeholderTextColor={"black"} value={searchMovie}
                            onChangeText={setSearchMovie} />
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        {savedMovies
                            .filter(
                                (movie) =>
                                    movie.movieName.toLowerCase().includes(searchMovie.toLowerCase())
                            )
                            .map((movie, index) => (
                                <MovSerCard
                                    key={movie.movieId}
                                    movieName={movie.movieName}
                                    date={movie.movieDate}
                                    vote={movie.movieVote}
                                    category={movie.movieCategory}
                                    poster={movie.moviePoster}
                                    time={movie.movieTime}
                                    onPressDelete={() => handleMovieDelete(movie)}
                                />
                            ))}
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={handleFabPress} style={styles.fab}>
                    <Icon style={styles.fabIcon} name="add" size={24} color={"white"} />
                    <Text style={styles.fabColor} >{Translations[language].addMovie}</Text>
                </TouchableOpacity>
              
            </KeyboardAvoidingView>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    style={styles.modalBackground}
                    activeOpacity={1}
                    onPress={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContent}
                            onPress={() => { }}
                        >
                            <View>
                                <View style={styles.searchMovie} >
                                    <Icon name={"search"} size={16} color="black" style={styles.icon} />
                                    <TextInput
                                        value={searchText}
                                        onChangeText={handleTextChange}
                                        placeholder={Translations[language].searchMovie}
                                        onFocus={handleSearchBarPress}
                                        style={styles.searchText}
                                    />
                                </View>

                                {selectedMovie ? (
                                    <View>
                                        <View style={styles.seperator2} />
                                        <Input label={Translations[language].selectedMovie} text={selectedMovie.title} />
                                        <View style={{ flexDirection: "row" }} >
                                            <View style={{ flex: 1, marginRight: 10, }} >
                                                <Input label={Translations[language].releaseDate} text={formatDate(selectedMovie.release_date)} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Input label={Translations[language].score} text={selectedMovie.vote_average.toFixed(1)} />
                                            </View>
                                        </View>
                                        <Input label={Translations[language].categories} text={categoryText} />

                                        <TouchableOpacity style={styles.button} onPress={saveMovie} >
                                            <Text style={styles.buttonText} >{Translations[language].saveMovie}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={searchResults}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={renderMovieItem}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    )
};

export default MoviesList;

