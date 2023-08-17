import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import { useStats } from "../../../Context/StatContext";
import styles from "./SeriesListStyles";

import SeriesCard from "../../../components/Card/SeriesCard/SeriesCard";
import Input from "../../../components/Input/Input";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Translations from "../../../languages/Translation";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function SeriesList({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [savedSeries, setSavedSeries] = useState([]);
    const [searchSerie, setSearchSerie] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [seasons, setSeasons] = useState("");
    const [episodes, setEpisodes] = useState("");
    const [savedSeriesAsync, setSavedSeriesAsync] = useState("");

    const { serieCounter, setSerieCounter } = useStats();
    const { language, setLanguage } = useStats();

    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        const fetchAndSetMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey  = (userID + "savedSeries");
                setSavedSeriesAsync(asyncKey);

                const series = await AsyncStorage.getItem(savedSeriesAsync);
                if (series) {
                    setSavedSeries(JSON.parse(series));
                    setSerieCounter(JSON.parse(series).length);
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };
        fetchAndSetMovies();
        if (route.params && route.params.Serie) {
            const { Serie } = route.params;
            // Eğer bir dizi aktarıldıysa, savedSeries dizisine ekleyin
            const updatedSeries = [Serie, ...savedSeries];
            setSavedSeries(updatedSeries);
            AsyncStorage.setItem(savedSeriesAsync, JSON.stringify(updatedSeries))
                .then(() => {
                    console.log("Dizi başarıyla eklendi.");
                    fetchSavedSeries();
                })
                .catch((error) => {
                    console.log("Dizi eklenirken bir hata oluştu:", error);
                });

            // route.params'ı temizleyin, böylece tekrar açıldığında Movie verisi yok olur
            navigation.setParams({ Serie: null });
        }
    }, [route.params]);

    const fetchSavedSeries = async () => {
        try {
            const series = await AsyncStorage.getItem(savedSeriesAsync);
            if (series) {
                setSavedSeries(JSON.parse(series));
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
        setSelectedSerie("");
        setSearchText("");
    };

    const saveSerie = async () => {
        // Verileri bir obje olarak hazırla
        const serieData = {
            serieId: selectedSerie.id,
            serieName: selectedSerie.name,
            serieReleaseDate: formatDate(selectedSerie.first_air_date),
            serieFinaldate: finalDate,
            serieVote: selectedSerie.vote_average.toFixed(1),
            serieCategory: categoryText,
            seriePoster: selectedSerie.poster_path,
            serieSeasons: seasons,
            serieEpisodes: episodes
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingSeries = await AsyncStorage.getItem(savedSeriesAsync);
            let updatedSeries = [];

            if (existingSeries) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedSeries = JSON.parse(existingSeries);
            }

            // Yeni filmi ekle
            updatedSeries.unshift(serieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(savedSeriesAsync, JSON.stringify(updatedSeries));

            // Kaydedilen filmleri güncelle
            setSavedSeries(updatedSeries);

            // Modalı kapat
            setSearchResults("");
            setSelectedSerie("");
            setSearchText("");
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const searchSeries = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/search/tv`, {
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

    const getSerieDetails = async (serieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/tv/${serieId}`, {
                params: {
                    api_key: API_KEY,
                },
            });
            const lastDate = response.data.last_air_date;
            const formattedDuration = formatDate(lastDate);
            setFinalDate(formattedDuration);
            setSeasons(response.data.number_of_seasons);
            setEpisodes(response.data.number_of_episodes);

        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('tr-TR'); // tr-TR, Türkiye'nin bölgesel kodudur

        return formattedDate;
    };

    const fetchGenreNames = async (genreIds) => {
        try {
            const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
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
        searchSeries();
    };

    const handleSerieSelect = async (serie) => {
        
        setSelectedSerie(serie);
        setSearchText(serie.name);
        getSerieDetails(serie.id);
        // Film tür adlarını al
        const genreNames = await fetchGenreNames(serie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
    };

    const handleSearchBarPress = () => {
        setSelectedSerie(null);
        setGenreNames([]);
    };

    const handleSerieDelete = (serie) => {
        Alert.alert(
            'Dizi Silme',
            `"${serie.serieName}" Dizisini silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteSerie(serie),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteSerie = async (serie) => {
        const updatedSeries = savedSeries.filter((m) => m.serieId !== serie.serieId);
        setSavedSeries(updatedSeries);
        AsyncStorage.setItem(savedSeriesAsync, JSON.stringify(updatedSeries))
            .then(() => {
                console.log('Dizi başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Dizi silinirken bir hata oluştu:', error);
            });
    };

    const renderSerieItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSerieSelect(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                    style={{ width: 50, height: 75, margin: 10 }}
                />
                <View>
                    <Text>{item.name} </Text>
                    <Text style={{ fontSize: 10, paddingTop: 6 }} >{formatDate(item.first_air_date)} </Text>
                </View>

            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                    <View style={styles.search} >
                        <Icon name="search" size={18} color={"black"} style={styles.icon} />
                        <TextInput style={{ fontSize: 13 }} placeholder={Translations[language].filterSerie} placeholderTextColor={"black"} value={searchSerie}
                            onChangeText={setSearchSerie} />
                    </View>
                </View>
                <View style={styles.seperator} />
                <ScrollView>
                    <View style={styles.content}>
                        {savedSeries
                            .filter(
                                (serie) =>
                                    serie.serieName.toLowerCase().includes(searchSerie.toLowerCase())
                            )
                            .map((serie, index) => (
                                <SeriesCard
                                    key={serie.serieId}
                                    serieName={serie.serieName}
                                    releaseDate={serie.serieReleaseDate}
                                    finalDate={serie.serieFinaldate}
                                    vote={serie.serieVote}
                                    category={serie.serieCategory}
                                    poster={serie.seriePoster}
                                    seasons={serie.serieSeasons}
                                    episodes={serie.serieEpisodes}
                                    onPressDelete={() => handleSerieDelete(serie)}
                                />
                            ))}
                    </View>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    label={Translations[language].addSerie}
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
                                        placeholder={Translations[language].searchSerie}
                                        onFocus={handleSearchBarPress}
                                        style={styles.searchText}
                                    />
                                </View>

                                {selectedSerie ? (
                                    <View>
                                        <View style={styles.seperator2} />
                                        <Input label={Translations[language].selectedSerie} text={selectedSerie.name} />
                                        <View style={{ flexDirection: "row" }} >
                                            <View style={{ flex: 1, marginRight: 10, }} >
                                                <Input label={Translations[language].releaseDate} text={formatDate(selectedSerie.first_air_date)} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Input label={Translations[language].score} text={selectedSerie.vote_average.toFixed(1)} />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row" }} >
                                            <View style={{ flex: 1, marginRight: 10, }} >
                                                <Input label={Translations[language].numberSeasons} text={seasons} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Input label={Translations[language].numberEpisodes} text={episodes} />
                                            </View>
                                        </View>
                                        <Input label={Translations[language].categories} text={categoryText} />

                                        <TouchableOpacity style={styles.button} onPress={saveSerie} >
                                            <Text style={styles.buttonText} >{Translations[language].saveSerie}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={searchResults}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={renderSerieItem}
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

export default SeriesList;

