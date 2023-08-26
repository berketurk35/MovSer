import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import { useStats } from "../../../Context/StatContext";
import styles from "./ReqSeriesListStyles";

import ReqSeriesCard from "../../../components/Card/ReqSeriesCard/ReqSeriesCard";
import Input from "../../../components/Input/Input";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
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
                const asyncKey  = (userID + "savedReqSeries");
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

    const renderSerieItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSerieSelect(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                    style={{ width: 50, height: 75, margin: 10 }}
                />
                <View>
                    <Text>{item.name} </Text>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{ fontSize: 10, paddingTop: 6 }} >{formatDate(item.first_air_date)} </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

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

export default ReqSeriesList;

