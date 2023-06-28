import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./SeriesListStyles";

import SeriesCard from "../../components/Card/SeriesCard/SeriesCard";
import Input from "../../components/Input/Input";

import PickerCategory from "../../components/Picker/PickerCategory/PickerCategory";
import PickerPlatform from "../../components/Picker/PickerPlatform/PickerPlatform";
import PickerSeasons from "../../components/Picker/PickerSeasons.js/PickerSeasons";
import PickerFinal from "../../components/Picker/PickerFinal/PickerFinal";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

function SeriesList({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    const [seriesName, setSeriesName] = useState('');
    const [seriesNote, setSeriesNote] = useState('-');

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedSeasons, setSelectedSeasons] = useState('-');
    const [isFinal, setIsFinal] = useState('-');

    const [savedSeries, setSavedSeries] = useState([]);

    const [searchSeries, setSearchSeries] = useState('');

    useEffect(() => {
        // Kaydedilmiş filmleri AsyncStorage'den al
        fetchSavedSeries();
    }, []);

    const fetchSavedSeries = async () => {
        try {
            const series = await AsyncStorage.getItem('savedSeries');
            if (series) {
                setSavedSeries(JSON.parse(series));
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
        setSelectedSeasons('');
        setIsFinal('');
    };

    const saveSerie = async () => {
        if (
            seriesName === '' ||
            selectedCategory === '' ||
            selectedPlatform === '' ||
            selectedSeasons === '' 
        ) {
            // Boş veri olduğunda kullanıcıya uyarı mesajı ver
            Alert.alert("Uyarı", 'Lütfen Tüm Bilgileri Doldurun.');
            return;
        }

        // Verileri bir obje olarak hazırla
        const serieData = {
            seriesName: seriesName,
            seriesNote: seriesNote,
            selectedCategory: selectedCategory,
            selectedPlatform: selectedPlatform,
            selectedSeasons: selectedSeasons,
            isFinal: isFinal + "-",
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingSeries = await AsyncStorage.getItem('savedSeries');
            let updatedSeries = [];

            if (existingSeries) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedSeries = JSON.parse(existingSeries);
            }

            // Yeni filmi ekle
            updatedSeries.push(serieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem('savedSeries', JSON.stringify(updatedSeries));

            // Kaydedilen filmleri güncelle
            setSavedSeries(updatedSeries);

            // Modalı kapat
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="height" >
                <ImageBackground source={require("../../images/4.jpeg")} style={styles.background} resizeMode="cover" >
                    <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={20} color={"black"} style={styles.icon} />
                            <TextInput placeholder="Dizi İsmi Sorgula" placeholderTextColor={"black"} value={searchSeries}
                                onChangeText={setSearchSeries} />
                        </View>
                    </View>
                    <View style={styles.seperator} />
                    <ScrollView>
                        <View style={styles.content}>
                            {savedSeries
                                .filter(
                                    (serie) =>
                                        serie.seriesName.toLowerCase().includes(searchSeries.toLowerCase())
                                )
                                .map((serie, index) => (
                                    <SeriesCard
                                        key={index}
                                        seriesName={serie.seriesName}
                                        category={serie.selectedCategory}
                                        platform={serie.selectedPlatform}
                                        seaons={serie.selectedSeasons}
                                        isFinal={serie.isFinal}
                                        note={serie.seriesNote}
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
                            <Input label={"Dizi Adı*"} icon={"pricetags"} placeholder={"Örn. Game Of Thrones"} value={seriesName} onChangeText={(seriesName) => setSeriesName(seriesName)} />
                            <View style={{ flexDirection: "row" }} >
                                <View style={{ flex: 1, marginRight: 10 }} >
                                    <PickerCategory selectedValue={selectedCategory} onValueChange={(itemValue) => setSelectedCategory(itemValue)} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PickerPlatform selectedValue={selectedPlatform} onValueChange={(itemValue) => setSelectedPlatform(itemValue)} />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }} >
                                <View style={{ flex: 1, marginRight: 10 }} >
                                    <PickerSeasons selectedValue={selectedSeasons} onValueChange={(itemValue) => setSelectedSeasons(itemValue)} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PickerFinal selectedValue={isFinal} onValueChange={(itemValue) => setIsFinal(itemValue)} />
                                </View>
                            </View>
                            <Input label={"Not"} icon={"chatbox"} placeholder={"Dizi ile ilgili not ekleyebilirsiniz.."} value={seriesNote} onChangeText={(seriesNote) => setSeriesNote(seriesNote)} />
                            <TouchableOpacity style={styles.button} onPress={saveSerie} >
                                <Text style={styles.buttonText} >Diziyi Kaydet</Text>
                            </TouchableOpacity>
                            <Text style={styles.bottomText} >( * olan alanlar zorunludur )</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>


    )
};

export default SeriesList;

