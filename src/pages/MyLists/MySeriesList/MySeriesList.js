import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image, Keyboard } from "react-native";
import { useStats } from "../../../Context/StatContext";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styles from "./MySeriesListStyles";

import ListCard from "../../../components/Card/ListCard/ListCard";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import Swiper from "react-native-swiper";

import AsyncStorage from '@react-native-async-storage/async-storage';

function MySerieList({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [savedSeriesList, setSavedSeriesList] = useState([]);
    const [searchSerie, setSearchSerie] = useState('');
    const [cardName, setCardName] = useState("");

    const [platformVisible, setPlatformVisible] = useState(false);
    const [picturesVisible, setPicturesVisible] = useState(false);
    const [swiperVisible, setSwiperVisible] = useState(false);
    const [swiperVisible2, setSwiperVisible2] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    const { serieListCounter, setSerieListCounter } = useStats();

    const ref = useRef(null);
    
    useEffect(() => {
        fetchSavedSeries();
        setSerieListCounter(savedSeriesList.length);
        }, [savedSeriesList]);

    const fetchSavedSeries = async () => {
        try {
            const updatedSerieLists = await AsyncStorage.getItem('serieList');
            if (updatedSerieLists) {
                setSavedSeriesList(JSON.parse(updatedSerieLists));
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
        setPlatformVisible(false);
        setPicturesVisible(false);
        setSwiperVisible2(false);
        setSwiperVisible(false);
    };

    const saveList = async () => {
        // Verileri bir obje olarak hazırla
        const listData = {
            id: cardName,
            listName: cardName,
            cardImage: selectedImage,
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingMovies = await AsyncStorage.getItem('serieList');
            let updatedSerieLists = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedSerieLists = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedSerieLists.unshift(listData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem('serieList', JSON.stringify(updatedSerieLists));

            // Kaydedilen filmleri güncelle
            setSavedSeriesList(updatedSerieLists);

            // Modalı kapat
            setPicturesVisible(false);
            setPlatformVisible(false);
            setSwiperVisible2(false);
            setSwiperVisible(false);
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const filterSerieListByName = (list, searchSerie) => {
        return list.filter((item) => item.listName.toLowerCase().includes(searchSerie.toLowerCase()));
    };

    const handleDeleteCard = (serie, index) => {
        Alert.alert(
            'Kart Silme',
            `"${serie.listName}" isimli kartını silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteSerie(index),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteSerie = async (index) => {
        const updatedSerieLists = [...savedSeriesList];
        updatedSerieLists.splice(index, 1);
        setSavedSeriesList(updatedSerieLists);
        AsyncStorage.setItem('serieList', JSON.stringify(updatedSerieLists))
            .then(() => {
                console.log('Kart başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Kart silinirken bir hata oluştu:', error);
            });
    };

    function openPlatform() {
        setPlatformVisible(!platformVisible);
        setPicturesVisible(false);
        Keyboard.dismiss();
    }

    function openPictures() {
        setPicturesVisible(!picturesVisible);
        setPlatformVisible(false);
        Keyboard.dismiss();
    }

    function handleImageClick(platform) {
        setSelectedPlatform(platform);
        setSelectedImage(platform);
        setSwiperVisible(true);
        setSwiperVisible2(false);
    }

    function handleImageClick2(platform) {
        setSelectedPlatform(platform);
        setSelectedImage(platform);
        setSwiperVisible2(true);
        setSwiperVisible(false);

    }

    function getPlatformImage(platform) {
        switch (platform) {
            case "netflix":
                return require("../../../images/netflix.png");
            case "prime":
                return require("../../../images/prime.png");
            case "disney":
                return require("../../../images/disney.png");
            case "blutv":
                return require("../../../images/blutv.png");
            case "mubi":
                return require("../../../images/mubi.png");
            case "exxen":
                return require("../../../images/exxen.png");
            case "appletv":
                return require("../../../images/appletv.png");
            case "hbo":
                return require("../../../images/hbo.png");
            default:
                return;
        }
    }

    function getCategoryImage(platform) {
        switch (platform) {
            case "1":
                return require("../../../images/1.png");
            case "2":
                return require("../../../images/2.png");
            case "3":
                return require("../../../images/3.png");
            case "4":
                return require("../../../images/4.png");
            case "5":
                return require("../../../images/5.png");
            case "6":
                return require("../../../images/6.png");
            case "7":
                return require("../../../images/7.png");
            case "8":
                return require("../../../images/8.png");
            case "9":
                return require("../../../images/9.png");
            case "10":
                return require("../../../images/10.png");
            case "11":
                return require("../../../images/11.png");
            case "12":
                return require("../../../images/12.png");
            default:
                return;
        }
    };

    function goToListDetails(listName) {
        navigation.navigate("SerieListDetails", { listName });
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider >
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container} behavior="height" >
                        <View style={{ flexDirection: "row", backgroundColor: "#8c8c8c", opacity: 0.7 }} >
                            <View style={styles.search} >
                                <Icon name="search" size={18} color={"black"} style={styles.icon} />
                                <TextInput style={{fontSize: 13}} placeholder="Filter Card Name" placeholderTextColor={"black"} value={searchSerie}
                                    onChangeText={setSearchSerie} />
                            </View>
                        </View>
                        
                            <DraggableFlatList
                                ref={ref}
                                data={filterSerieListByName(savedSeriesList, searchSerie)}
                                keyExtractor={(item) => item.id}
                                onDragEnd={({ data }) => setSavedSeriesList(data)}
                                renderItem={({ item, drag }) => (
                                    <ListCard
                                      id={item.id}
                                      cardName={item.listName}
                                      imageName={item.cardImage}
                                      onPressDetail={() => goToListDetails(item.listName)}
                                      onDrag={drag} 
                                    />
                                  )}
                                />

                        <FAB
                            style={styles.fab}
                            icon="plus"
                            label="Add Card"
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
                                            <Text style={styles.cardName} > Card Name </Text>
                                            <View style={styles.searchMovie} >
                                                <TextInput
                                                    value={cardName}
                                                    autoCapitalize="sentences"
                                                    onChangeText={setCardName}
                                                    placeholder="Write Card Name.."
                                                    style={styles.searchText}
                                                />
                                            </View>
                                            <View style={styles.seperator2} />
                                            <Text style={styles.imageBack} > Card Background Images </Text>
                                            <TouchableOpacity onPress={openPlatform}>
                                                <Text style={styles.text}> -&gt; Video Streaming Platforms</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {platformVisible && (
                                            <View>
                                                <View style={styles.bodyRow}>
                                                    <TouchableOpacity onPress={() => handleImageClick("netflix")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/netflix.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("prime")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/prime.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("disney")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/disney.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("blutv")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/blutv.png")}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.bodyRow}>
                                                    <TouchableOpacity onPress={() => handleImageClick("mubi")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/mubi.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("exxen")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/exxen.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("appletv")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/appletv.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("hbo")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/hbo.png")}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                        <TouchableOpacity onPress={openPictures}>
                                            <Text style={styles.text}> -&gt; Pictures from Different Categories</Text>
                                        </TouchableOpacity>
                                        {picturesVisible && (
                                            <View>
                                                <View style={styles.bodyRow}>
                                                    <TouchableOpacity onPress={() => handleImageClick2("1")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/1.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("2")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/2.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("3")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/3.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("4")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/4.png")}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.bodyRow}>
                                                    <TouchableOpacity onPress={() => handleImageClick2("5")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/5.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("6")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/6.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("7")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/7.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("8")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/8.png")}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.bodyRow}>
                                                    <TouchableOpacity onPress={() => handleImageClick2("9")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/9.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("10")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/10.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("11")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/11.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick2("12")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/12.png")}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                        <View style={styles.seperator2} />
                                        {swiperVisible && (
                                            <View style={styles.body}>
                                                <Text style={styles.preview} >Preview</Text>
                                                <Swiper
                                                    showsButtons={true}
                                                    dotColor="white"
                                                    showsPagination={true}

                                                >
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={getPlatformImage(selectedPlatform)}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/netflix.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/prime.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/disney.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/blutv.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/mubi.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/exxen.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/appletv.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/hbo.png")}
                                                        />
                                                    </View>
                                                </Swiper>
                                            </View>
                                        )}

                                        {swiperVisible2 && (
                                            <View style={styles.body}>
                                                <Text style={styles.preview} >Preview</Text>
                                                <Swiper
                                                    showsButtons={true}
                                                    dotColor="white"
                                                    showsPagination={true}

                                                >
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={getCategoryImage(selectedPlatform)}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/1.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/2.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/3.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/4.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/5.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/6.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/7.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/8.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/9.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/10.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/11.png")}
                                                        />
                                                    </View>
                                                    <View style={styles.slide}>
                                                        <Image
                                                            style={styles.image}
                                                            resizeMode="contain"
                                                            source={require("../../../images/12.png")}
                                                        />
                                                    </View>
                                                </Swiper>
                                            </View>
                                        )}
                                        <TouchableOpacity style={styles.button} onPress={saveList} >
                                            <Text style={styles.buttonText} >Save Card</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>

                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
};

export default MySerieList;

