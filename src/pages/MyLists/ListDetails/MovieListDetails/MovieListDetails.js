import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import styles from "./MovieListDetailsStyles";
import { Dimensions } from "react-native";

import MovSerCard from "../../../../components/Card/MoviesCard/MoviesCard";
import Input from "../../../../components/Input/Input";

import { FAB } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function MovieListDetails({ navigation, route }) {

    const { listName } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [duration, setDuration] = useState("");

    const ref = useRef(null);

    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        fetchSavedMovies();
    }, []);

    const fetchSavedMovies = async () => {
        try {
            const movies = await AsyncStorage.getItem(listName);
            if (movies) {
                setSavedMovies(JSON.parse(movies));
            }
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const handleFabPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSearchResults("");
        setSelectedMovie("");
        setSearchText("");
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
            const existingMovies = await AsyncStorage.getItem(listName);
            let updatedListDetails = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedListDetails = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedListDetails.unshift(movieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(listName, JSON.stringify(updatedListDetails));

            // Kaydedilen filmleri güncelle
            setSavedMovies(updatedListDetails);

            // Modalı kapat
            setSearchResults("");
            setSelectedMovie("");
            setSearchText("");
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const filterMovieListByName = (list, searchMovie) => {
        return list.filter((item) => item.movieName.toLowerCase().includes(searchMovie.toLowerCase()));
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

    const handleMovieDelete = (item) => {
        Alert.alert(
            'Film Silme',
            `"${item.movieName}" Filmini silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteMovie(item),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteMovie = async (item) => {
        const updatedListDetails = savedMovies.filter((m) => m.movieId !== item.movieId);
        setSavedMovies(updatedListDetails);
        AsyncStorage.setItem(listName, JSON.stringify(updatedListDetails))
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

    function back() {
        navigation.goBack();
    };

    function formatMovieName(name, maxLength) {
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength - 3) + '...';
        }
    }

    const renderItem = ({ item, drag }) => {

        const sName = item.movieName;
        const maxLengthToShow = 34;

        const formattedMovieName = formatMovieName(sName, maxLengthToShow);

        const { isActive } = useOnCellActiveAnimation();

        return (
            <ScaleDecorator>
                <OpacityDecorator activeOpacity={1} >
                    <ShadowDecorator>
                        <TouchableOpacity onLongPress={drag} activeOpacity={1} style={{ height: Dimensions.get("window").height / 5, elevation: isActive ? 60 : 0, shadowColor: "white", }} >
                            <Animated.View>
                                <View style={styles.card} >
                                    <View style={styles.topCard} >
                                        <View style={styles.poster} >
                                            <Image
                                                source={{ uri: `${IMAGE_BASE_URL}${item.moviePoster}` }}
                                                resizeMode="contain"
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={styles.rightCard}>
                                            <View style={styles.movieNameCard} >
                                                <Text style={styles.textMovie} >
                                                    {formattedMovieName}
                                                </Text>
                                            </View>
                                            <Text style={styles.textCategory}>
                                                {item.movieCategory}
                                            </Text>
                                            <View style={styles.topCard}>
                                                <IconMaterial name={"date-range"} color={"yellow"} size={16} style={styles.iconx} />
                                                <Text style={styles.textDate}>
                                                    {item.movieDate}
                                                </Text>
                                                <Text style={styles.textDate}>
                                                    |    {item.movieTime}
                                                </Text>
                                            </View>
                                            <View style={styles.topCard} >
                                                <View style={{ flexDirection: "row", flex: 1 }} >
                                                    <Icon name={"star"} color={"green"} size={16} style={styles.iconx} />
                                                    <Text style={styles.textVote}>
                                                        {item.movieVote}
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => handleMovieDelete(item)} style={styles.icon2}>
                                                <IconMaterial name={"cancel"} color={"#ff675c"} size={16} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    </ShadowDecorator>
                </OpacityDecorator>
            </ScaleDecorator>
        );
    };

    return (
        <GestureHandlerRootView style={styles.container} >
            <SafeAreaView style={styles.container}>
                <View style={styles.customHeader}>
                    <Icon name="arrow-back" size={22} color={"black"} style={styles.backIcon} onPress={back} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>{listName}</Text>
                    </View>
                    <View style={{ flex: 0.5 }} />
                </View>
                <KeyboardAvoidingView style={styles.container} >
                    <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={18} color={"black"} style={styles.icon} />
                            <TextInput style={{ fontSize: 13 }} placeholder="Filter Movie Name" placeholderTextColor={"black"} value={searchMovie}
                                onChangeText={setSearchMovie} />
                        </View>
                    </View>
                    <View style={styles.seperator} />

                    <DraggableFlatList
                        ref={ref}
                        data={filterMovieListByName(savedMovies, searchMovie)}
                        keyExtractor={(item) => item.movieId}
                        onDragEnd={({ data }) => setSavedMovies(data)}
                        renderItem={renderItem}
                    />
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label="Add Movie"
                        color="white"
                        onPress={handleFabPress}
                    />

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
                                            placeholder="Search Movie Name..."
                                            onFocus={handleSearchBarPress}
                                            style={styles.searchText}
                                        />
                                    </View>

                                    {selectedMovie ? (
                                        <View>
                                            <View style={styles.seperator2} />
                                            <Input label={"Selected Movie"} text={selectedMovie.title} />
                                            <View style={{ flexDirection: "row" }} >
                                                <View style={{ flex: 1, marginRight: 10, }} >
                                                    <Input label={"Release Date"} text={formatDate(selectedMovie.release_date)} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Input label={"Score"} text={selectedMovie.vote_average.toFixed(1)} />
                                                </View>
                                            </View>
                                            <Input label={"Categories"} text={categoryText} />

                                            <TouchableOpacity style={styles.button} onPress={saveMovie} >
                                                <Text style={styles.buttonText} >Save Movie</Text>
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
        </GestureHandlerRootView>



    )
};

export default MovieListDetails;

