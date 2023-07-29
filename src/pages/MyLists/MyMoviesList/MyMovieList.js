import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import styles from "./MyMovieListStyles";

import ListCard from "../../../components/Card/ListCard/ListCard";
import ImageSwiper from "../../../components/ImageSwiper/ImageSwiper";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

function MyMovieList() {

    const [modalVisible, setModalVisible] = useState(false);
    const [savedMovieList, setSavedMovieList] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [cardName, setCardName] = useState("");

    useEffect(() => {
        fetchSavedMovies();
    }, []);

    const fetchSavedMovies = async () => {
        try {
            const movieList = await AsyncStorage.getItem('movieList');
            if (movieList) {
                setSavedMovieList(JSON.parse(movieList));
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
        setCardName("");
    };

    const saveList = async () => {
        // Verileri bir obje olarak hazırla
        const listData = {
            listName: cardName,
            //cardImage: defaultSelectedImage,
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingMovies = await AsyncStorage.getItem('movieList');
            let updatedMovieLists = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedMovieLists = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedMovieLists.unshift(listData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem('movieList', JSON.stringify(updatedMovieLists));

            // Kaydedilen filmleri güncelle
            setSavedMovieList(updatedMovieLists);

            // Modalı kapat
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const handleDeleteCard = (movie, index) => {
        Alert.alert(
            'Kart Silme',
            `"${movie.listName}" isimli kartını silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteMovie(index),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteMovie = async (index) => {
        const updatedMovieLists = [...savedMovieList]; // savedMovieList dizisinin kopyasını alıyoruz
        updatedMovieLists.splice(index, 1); // Kartı diziden siliyoruz
        setSavedMovieList(updatedMovieLists);
        AsyncStorage.setItem('movieList', JSON.stringify(updatedMovieLists))
            .then(() => {
                console.log('Kart başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Kart silinirken bir hata oluştu:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7, marginBottom: 20, }} >
                    <View style={styles.search} >
                        <Icon name="search" size={20} color={"black"} style={styles.icon} />
                        <TextInput placeholder="Search Card Name" placeholderTextColor={"black"} value={searchMovie}
                            onChangeText={setSearchMovie} />
                    </View>
                </View>
                <View style={styles.seperator} />
                <ScrollView>
                    <View style={styles.content}>
                        {savedMovieList
                            .map((movie, index) => (
                                <ListCard
                                    key={index}
                                    cardName={movie.listName}
                                    onPressDelete={() => handleDeleteCard(movie, index)}
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
                                <View>
                                    <ImageSwiper value={cardName} onChangeText={setCardName} onPressButton={saveList}  />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>


    )
};

export default MyMovieList;

