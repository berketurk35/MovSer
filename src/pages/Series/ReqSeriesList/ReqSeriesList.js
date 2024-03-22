import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import { useStats } from "../../../Context/StatContext";
import styles from "./ReqSeriesListStyles";

import ReqSeriesCard from "../../../components/Card/ReqSeriesCard/ReqSeriesCard";
import CustomSerieModal from "../../../components/Modal/CustomSerieModal/CustomSerieModal";
import SearchFilter1 from "../../../components/SearchFilter/SearchFilter1/SearchFilter1";
import Fab from "../../../components/Fab/Fab";

import Translations from "../../../languages/Translation";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function ReqSeriesList({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [savedReqSeries, setSavedReqSeries] = useState([]);
    const [searchSerie, setSearchSerie] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [seasons, setSeasons] = useState("");
    const [episodes, setEpisodes] = useState("");
    const [instantDate, setInstantDate] = useState('');
    const [savedReqSeriesAsync, setSavedReqSeriesAsync] = useState("");

    const { reqSerieCounter, setReqSerieCounter } = useStats();
    const { language, setLanguage } = useStats();

    useEffect(() => {
        const fetchAndSetMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + "savedReqSeries");
                setSavedReqSeriesAsync(asyncKey);

                const series = await AsyncStorage.getItem(savedReqSeriesAsync);
                if (series) {
                    setSavedReqSeries(JSON.parse(series));
                    setReqSerieCounter(JSON.parse(series).length);
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };
        fetchAndSetMovies();
    }, [savedReqSeriesAsync]);

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
            serieEpisodes: episodes,
            savedDate: new Date().toLocaleDateString('tr-TR'),
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingSeries = await AsyncStorage.getItem(savedReqSeriesAsync);
            let updatedSeries = [];

            if (existingSeries) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedSeries = JSON.parse(existingSeries);

                const isAlreadyAdded = updatedSeries.some(
                    (serie) => serie.serieId === serieData.serieId
                );

                if (isAlreadyAdded) {
                    console.log("Bu film zaten eklenmiş.");
                    closeModal();
                    return;
                }
            }

            // Yeni filmi ekle
            updatedSeries.unshift(serieData);
            instaDate();

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(savedReqSeriesAsync, JSON.stringify(updatedSeries));

            // Kaydedilen filmleri güncelle
            setSavedReqSeries(updatedSeries);

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
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('tr-TR'); // tr-TR, Türkiye'nin bölgesel kodudur

        return formattedDate;
    };

    const instaDate = () => {
        const date = new Date();
        const dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        setInstantDate(dateStr);
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
            Translations[language].serieMoveTitle,
            `"${serie.serieName}", ${Translations[language].serieMoveText1}`,
            [
                {
                    text: Translations[language].giveUp,
                    style: 'cancel',
                },
                {
                    text: Translations[language].moveDelete,
                    style: 'destructive',
                    onPress: () => deleteSerie(serie),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteSerie = async (serie) => {
        const updatedSeries = savedReqSeries.filter((m) => m.serieId !== serie.serieId);
        setSavedReqSeries(updatedSeries);
        AsyncStorage.setItem(savedReqSeriesAsync, JSON.stringify(updatedSeries))
            .then(() => {
                console.log('Dizi başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Dizi silinirken bir hata oluştu:', error);
            });
    };

    const onPressAdd = (serie) => {
        Alert.alert(
            Translations[language].serieMoveTitle,
            `"${serie.serieName}", ${Translations[language].serieMoveText1}`,
            [
                {
                    text: Translations[language].giveUp,
                    style: 'cancel',
                },
                {
                    text: Translations[language].moveDelete,
                    style: 'destructive',
                    onPress: () => moveDeleteSerie(serie),
                },
            ],
            { cancelable: false }
        );
    };

    const moveDeleteSerie = async (serie) => {
        navigation.navigate("ActiveSeriesList", { Serie: serie || null })
        const updatedSeries = savedReqSeries.filter((m) => m.serieId !== serie.serieId);
        setSavedReqSeries(updatedSeries);
        AsyncStorage.setItem(savedReqSeriesAsync, JSON.stringify(updatedSeries))
            .then(() => {
                console.log('Dizi başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Dizi silinirken bir hata oluştu:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <SearchFilter1
                    placeholder={Translations[language].filterSerie}
                    value={searchSerie}
                    onChangeText={setSearchSerie}
                />
                <ScrollView>
                    <View style={styles.content}>
                        {savedReqSeries
                            .filter(
                                (serie) =>
                                    serie.serieName.toLowerCase().includes(searchSerie.toLowerCase())
                            )
                            .map((serie, index) => (
                                <ReqSeriesCard
                                    key={serie.serieId}
                                    savedDate={serie.savedDate}
                                    serieName={serie.serieName}
                                    releaseDate={serie.serieReleaseDate}
                                    finalDate={serie.serieFinaldate}
                                    vote={serie.serieVote}
                                    category={serie.serieCategory}
                                    poster={serie.seriePoster}
                                    seasons={serie.serieSeasons}
                                    episodes={serie.serieEpisodes}
                                    onPressList={() => onPressAdd(serie)}
                                    onPressDelete={() => handleSerieDelete(serie)}
                                    iconName={"add-circle"}
                                />
                            ))}
                    </View>
                </ScrollView>

                <Fab onPress={handleFabPress} text={Translations[language].addSerie} />

            </KeyboardAvoidingView>

            <CustomSerieModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                searchText={searchText}
                setSearchText={setSearchText}
                searchResults={searchResults}
                setSelectedSerie={setSelectedSerie}
                selectedSerie={selectedSerie}
                handleTextChange={handleTextChange}
                handleSearchBarPress={handleSearchBarPress}
                handleSerieSelect={handleSerieSelect}
                saveSerie={saveSerie}
                Translations={Translations}
                language={language}
                formatDate={formatDate}
                categoryText={categoryText}
                seasons={seasons}
                episodes={episodes}
                IMAGE_BASE_URL={IMAGE_BASE_URL}
            />

        </SafeAreaView>
    )
};

export default ReqSeriesList;

