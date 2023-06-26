import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./ReqMoviesListStyles";

import MovSerCard from "../../components/MovSerCard/MovSerCard";
import Input from "../../components/Input/Input";
import PickerCategory from "../../components/PickerCategory/PickerCategory";
import PickerPlatform from "../../components/PickerPlatform/PickerPlatform";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

function ReqMoviesList({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    const [reqMovieName, setReqMovieName] = useState('');
    const [reqMovieNote, setReqMovieNote] = useState('-');
    const [reqSelectedCategory, setReqSelectedCategory] = useState('');
    const [reqSelectedPlatform, setReqSelectedPlatform] = useState('');

    const [savedReqMovies, setSavedReqMovies] = useState([]);

    const [searchReqMovie, setSearchReqMovie] = useState('');

    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        fetchSavedMovies();
    }, []);

    const fetchSavedMovies = async () => {
        try {
            const movies = await AsyncStorage.getItem('savedReqMovies');
            if (movies) {
                setSavedReqMovies(JSON.parse(movies));
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
        clearData();
    };

    const closeModal = () => {
        setModalVisible(false);
        setReqSelectedCategory('');
        setReqSelectedPlatform('');
    };

    const saveMovie = async () => {
        if (
            reqMovieName === '' ||
            reqSelectedCategory === '' ||
            reqSelectedPlatform === ''
        ) {
            // Boş veri olduğunda kullanıcıya uyarı mesajı ver
            Alert.alert("Uyarı", 'Lütfen Tüm Bilgileri Doldurun.');
            return;
        }

        // Verileri bir obje olarak hazırla
        const reqMovieData = {
            reqMovieName: reqMovieName,
            reqMovieNote: reqMovieNote,
            reqSelectedCategory: reqSelectedCategory,
            reqSelectedPlatform: reqSelectedPlatform
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingMovies = await AsyncStorage.getItem('savedReqMovies');
            let updatedMovies = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedMovies = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedMovies.push(reqMovieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem('savedReqMovies', JSON.stringify(updatedMovies));

            // Kaydedilen filmleri güncelle
            setSavedReqMovies(updatedMovies);

            // Modalı kapat
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <ImageBackground source={require("../../images/2.jpeg")} style={styles.background} resizeMode="cover">
                    <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={20} color={"black"} style={styles.icon} />
                            <TextInput placeholder="Film İsmi Sorgula" placeholderTextColor={"black"} value={searchReqMovie}
                                onChangeText={setSearchReqMovie} />
                        </View>
                    </View>
                    <View style={styles.seperator} />
                    <ScrollView>
                        <View style={styles.content}>
                            {savedReqMovies
                                .filter(
                                    (movie) =>
                                        movie.reqMovieName.toLowerCase().includes(searchReqMovie.toLowerCase())
                                )
                                .map((movie, index) => (
                                    <MovSerCard
                                        key={index}
                                        movieName={movie.reqMovieName}
                                        category={movie.reqSelectedCategory}
                                        platform={movie.reqSelectedPlatform}
                                        note={movie.reqMovieNote}
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
                            <Input label={"Film Adı"} icon={"pricetags"} placeholder={"Örn. Harry Potter ve Sırlar Odası"} value={reqMovieName} onChangeText={(reqMovieName) => setReqMovieName(reqMovieName)} />
                            <View style={{ flexDirection: "row" }} >
                                <View style={{ flex: 1, marginRight: 10 }} >
                                    <PickerCategory selectedValue={reqSelectedCategory} onValueChange={(itemValue) => setReqSelectedCategory(itemValue)} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PickerPlatform selectedValue={reqSelectedPlatform} onValueChange={(itemValue) => setReqSelectedPlatform(itemValue)} />
                                </View>
                            </View>
                            <Input label={"Not"} icon={"chatbox"} placeholder={"Film ile ilgili not ekleyebilirsiniz.."} value={reqMovieNote} onChangeText={(reqMovieNote) => setReqMovieNote(reqMovieNote)} />
                            <TouchableOpacity style={styles.button} onPress={saveMovie} >
                                <Text style={styles.buttonText} >Filmi Kaydet</Text>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>


    )
};

export default ReqMoviesList;

