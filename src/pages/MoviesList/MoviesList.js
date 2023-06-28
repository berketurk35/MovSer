import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./MovieListStyles";

import MovSerCard from "../../components/Card/MoviesCard/MoviesCard";
import Input from "../../components/Input/Input";
import PickerCategory from "../../components/Picker/PickerCategory/PickerCategory";
import PickerPlatform from "../../components/Picker/PickerPlatform/PickerPlatform";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

function MoviesList({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    const [movieName, setMovieName] = useState('');
    const [movieNote, setMovieNote] = useState('-');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');

    const [savedMovies, setSavedMovies] = useState([]);

    const [searchMovie, setSearchMovie] = useState('');

    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        fetchSavedMovies();
    }, []);

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
        setSelectedCategory('');
        setSelectedPlatform('');
    };

    const saveMovie = async () => {
        if (
            movieName === '' ||
            selectedCategory === '' ||
            selectedPlatform === ''
        ) {
            // Boş veri olduğunda kullanıcıya uyarı mesajı ver
            Alert.alert("Uyarı", 'Lütfen Tüm Bilgileri Doldurun.');
            return;
        }

        // Verileri bir obje olarak hazırla
        const movieData = {
            movieName: movieName,
            movieNote: movieNote,
            selectedCategory: selectedCategory,
            selectedPlatform: selectedPlatform
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
            updatedMovies.push(movieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem('savedMovies', JSON.stringify(updatedMovies));

            // Kaydedilen filmleri güncelle
            setSavedMovies(updatedMovies);

            // Modalı kapat
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <ImageBackground source={require("../../images/3.jpeg")} style={styles.background}>
                    <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={20} color={"black"} style={styles.icon} />
                            <TextInput placeholder="Film İsmi Sorgula" placeholderTextColor={"black"} value={searchMovie}
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
                                        key={index}
                                        movieName={movie.movieName}
                                        category={movie.selectedCategory}
                                        platform={movie.selectedPlatform}
                                        note={movie.movieNote}
                                    />
                                ))}
                        </View>
                    </ScrollView>
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        //customSize={40}
                        label="Ekle"
                        color="white"
                        onPress={handleFabPress}
                    />
                </ImageBackground>
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
                            <Input label={"Film Adı*"} icon={"pricetags"} placeholder={"Örn. Harry Potter ve Sırlar Odası"} value={movieName} onChangeText={(movieName) => setMovieName(movieName)} />
                            <View style={{ flexDirection: "row" }} >
                                <View style={{ flex: 1, marginRight: 10 }} >
                                    <PickerCategory selectedValue={selectedCategory} onValueChange={(itemValue) => setSelectedCategory(itemValue)} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PickerPlatform selectedValue={selectedPlatform} onValueChange={(itemValue) => setSelectedPlatform(itemValue)} />
                                </View>
                            </View>
                            <Input label={"Not"} icon={"chatbox"} placeholder={"Film ile ilgili not ekleyebilirsiniz.."} value={movieNote} onChangeText={(movieNote) => setMovieNote(movieNote)} />
                            <TouchableOpacity style={styles.button} onPress={saveMovie} >
                                <Text style={styles.buttonText} >Filmi Kaydet</Text>
                            </TouchableOpacity>
                            <Text style={styles.bottomText} >( * olan alanlar zorunludur )</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>


    )
};

export default MoviesList;

