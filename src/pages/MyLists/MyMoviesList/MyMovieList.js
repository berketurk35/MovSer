import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import styles from "./MyMovieListStyles";

import MovSerCard from "../../../components/Card/MoviesCard/MoviesCard";
import Input from "../../../components/Input/Input";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function MyLists({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [duration, setDuration] = useState("");
    const [cardName, setCardName] = useState("");


    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        fetchSavedMovies();
        //clearData();
        if (route.params && route.params.Movie) {
            const { Movie } = route.params;
            // Eğer bir film aktarıldıysa, savedMovies dizisine ekleyin
            const updatedMovies = [Movie, ...savedMovies];
            setSavedMovies(updatedMovies);
            AsyncStorage.setItem("savedMovies", JSON.stringify(updatedMovies))
                .then(() => {
                    console.log("Film başarıyla eklendi.");
                    fetchSavedMovies();
                })
                .catch((error) => {
                    console.log("Film eklenirken bir hata oluştu:", error);
                });

            // route.params'ı temizleyin, böylece tekrar açıldığında Movie verisi yok olur
            navigation.setParams({ Movie: null });
        }
    }, [route.params]);

    const fetchSavedMovies = async () => {
        try {
            const movies = await AsyncStorage.getItem('savedMovies');
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
            const existingMovies = await AsyncStorage.getItem('savedMovies');
            let updatedMovies = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedMovies = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedMovies.unshift(movieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem('savedMovies', JSON.stringify(updatedMovies));

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

    const handleMovieSelect = async (movie) => {
        //console.log(movie);
        setSelectedMovie(movie);
        setSearchText(movie.title);
        getMovieDetails(movie.id);
        // Film tür adlarını al
        const genreNames = await fetchGenreNames(movie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
    };

    const handleMovieDelete = (movie) => {
        Alert.alert(
            'Film Silme',
            `"${movie.movieName}" Filmini silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
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
        AsyncStorage.setItem('savedMovies', JSON.stringify(updatedMovies))
            .then(() => {
                console.log('Film başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Film silinirken bir hata oluştu:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                    <View style={styles.search} >
                        <Icon name="search" size={20} color={"black"} style={styles.icon} />
                        <TextInput placeholder="Search Movie Name" placeholderTextColor={"black"} value={searchMovie}
                            onChangeText={setSearchMovie} />
                    </View>
                </View>
                <View style={styles.seperator} />
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
                                    onPressList={null}
                                    onPressDelete={() => handleMovieDelete(movie)}
                                    iconName={"library-add"}
                                />
                            ))}
                    </View>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    label="Kart Ekle"
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
                                <Text style={styles.cardName} > Card Name </Text>
                                <View style={styles.searchMovie} >
                                    <TextInput
                                        value={cardName}
                                        onChangeText={setCardName}
                                        placeholder="Kart ismini yazınız.."
                                        style={styles.searchText}
                                    />
                                </View>
                                <View>
                                    <View style={styles.seperator2} />
                                    <Input label={"Seçilen Film"} text={"slm"} />
                                    <View style={{ flexDirection: "row" }} >
                                        <View style={{ flex: 1, marginRight: 10, }} >
                                            <Input label={"Çıkış Tarihi"} text={"slm"} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Input label={"Puanı"} text={"slm"} />
                                        </View>
                                    </View>
                                    <Input label={"Kategorileri"} text={"slm"} />

                                    <TouchableOpacity style={styles.button} onPress={saveMovie} >
                                        <Text style={styles.buttonText} >Filmi Kaydet</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>


    )
};

export default MyLists;

