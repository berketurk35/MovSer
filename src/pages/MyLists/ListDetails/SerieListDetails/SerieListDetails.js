import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import styles from "./SerieListDetailsStyles";
import { Dimensions } from "react-native";

import Input from "../../../../components/Input/Input";

import { FAB } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function SerieListDetails({ navigation, route }) {

    const { listName } = route.params;

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

    const ref = useRef(null);

    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        fetchSavedSeries();
    }, []);

    const fetchSavedSeries = async () => {
        try {
            const series = await AsyncStorage.getItem(listName);
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
            const existingSeries = await AsyncStorage.getItem(listName);
            let updatedListDetails = [];

            if (existingSeries) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedListDetails = JSON.parse(existingSeries);
            }

            // Yeni filmi ekle
            updatedListDetails.unshift(serieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(listName, JSON.stringify(updatedListDetails));

            // Kaydedilen filmleri güncelle
            setSavedSeries(updatedListDetails);

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
        const genreNames = await fetchGenreNames(movie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
    };

    const handleSearchBarPress = () => {
        setSelectedSerie(null);
        setGenreNames([]);
    };

    const handleSerieDelete = (item) => {
        Alert.alert(
            'Dizi Silme',
            `"${item.serieName}" Dizisini silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteSerie(item),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteSerie = async (item) => {
        const updatedListDetails = savedSeries.filter((m) => m.serieId !== item.serieId);
        setSavedSeries(updatedListDetails);
        AsyncStorage.setItem(listName, JSON.stringify(updatedListDetails))
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
                </View>
            </View>
        </TouchableOpacity>
    );

    function back() {
        navigation.goBack();
    };

    function formatSerieName(name, maxLength) {
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength - 3) + '...';
        }
    }

    const renderItem = ({ item, drag }) => {

        const sName = item.serieName;
        const maxLengthToShow = 34;

        const formattedSerieName = formatSerieName(sName, maxLengthToShow);

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
                                                source={{ uri: `${IMAGE_BASE_URL}${item.seriePoster}` }}
                                                resizeMode="contain"
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={styles.rightCard}>
                                            <View style={styles.movieNameCard} >
                                                <Text style={styles.textMovie} >
                                                    {formattedSerieName}
                                                </Text>
                                            </View>
                                            <Text style={styles.textCategory}>
                                                {item.serieCategory}
                                            </Text>
                                            <View style={styles.topCard}>
                                                <IconMaterial name={"date-range"} color={"yellow"} size={16} style={styles.iconx} />
                                                <Text style={styles.textDate}>
                                                    {item.serieReleaseDate}
                                                </Text>
                                                <Text style={styles.textDate}>
                                                    |    {item.serieFinaldate}
                                                </Text>
                                            </View>
                                            <View style={styles.topCard}>
                                                <Icon name={"analytics"} color={"pink"} size={16} style={styles.iconx} />
                                                <Text style={styles.textSeasons}>
                                                    {item.seasons} Season
                                                </Text>
                                                <Text style={styles.textSeasons}>
                                                    |    {item.episodes} Episode
                                                </Text>
                                            </View>
                                            <View style={styles.topCard} >
                                                <View style={{ flexDirection: "row", flex: 1 }} >
                                                    <Icon name={"star"} color={"green"} size={16} style={styles.iconx} />
                                                    <Text style={styles.textVote}>
                                                        {item.serieVote}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity onPress={() => handleSerieDelete(item)} style={styles.icon2}>
                                                    <IconMaterial name={"cancel"} color={"red"} size={18} />
                                                </TouchableOpacity>
                                            </View>
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
                            <Icon name="search" size={20} color={"black"} style={styles.icon} />
                            <TextInput placeholder="Search Serie Name" placeholderTextColor={"black"} value={searchSerie}
                                onChangeText={setSearchSerie} />
                        </View>
                    </View>
                    <View style={styles.seperator} />

                    <DraggableFlatList
                        ref={ref}
                        data={savedSeries}
                        keyExtractor={(item) => item.serieId}
                        onDragEnd={({ data }) => setSavedSeries(data)}
                        renderItem={renderItem}
                    />
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label="Ekle"
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
                                            placeholder="Dizi İsmi Ara..."
                                            onFocus={handleSearchBarPress}
                                            style={styles.searchText}
                                        />
                                    </View>

                                    {selectedSerie ? (
                                        <View>
                                            <View style={styles.seperator2} />
                                            <Input label={"Seçilen Dizi"} text={selectedSerie.name} />
                                            <View style={{ flexDirection: "row" }} >
                                                <View style={{ flex: 1, marginRight: 10, }} >
                                                    <Input label={"Çıkış Tarihi"} text={formatDate(selectedSerie.first_air_date)} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Input label={"Puanı"} text={selectedSerie.vote_average.toFixed(1)} />
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row" }} >
                                            <View style={{ flex: 1, marginRight: 10, }} >
                                                <Input label={"Sezon Sayısı"} text={seasons} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Input label={"Bölüm Sayısı"} text={episodes} />
                                            </View>
                                        </View>
                                            <Input label={"Kategorileri"} text={categoryText} />

                                            <TouchableOpacity style={styles.button} onPress={saveSerie} >
                                                <Text style={styles.buttonText} >Diziyi Kaydet</Text>
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
        </GestureHandlerRootView>



    )
};

export default SerieListDetails;

