import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useStats } from "../../../Context/StatContext";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from "./MyMovieListStyles";

import ListCard from "../../../components/Card/ListCard/ListCard";
import RemoveCard from "../../../components/Card/RemoveCard/RemoveCard";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Translations from "../../../languages/Translation";

import Swiper from "react-native-swiper";

import AsyncStorage from '@react-native-async-storage/async-storage';

function MyMovieList({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [savedMovieList, setSavedMovieList] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [cardName, setCardName] = useState("");

    const [platformVisible, setPlatformVisible] = useState(false);
    const [picturesVisible, setPicturesVisible] = useState(false);
    const [swiperVisible, setSwiperVisible] = useState(false);
    const [swiperVisible2, setSwiperVisible2] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [movieListAsync, setMovieListAsync] = useState("");
    const [err, setEr] = useState("");

    const [draggedMovieList, setDraggedMovieList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const { movieListCounter, setMovieListCounter } = useStats();
    const { language, setLanguage } = useStats();

    const ref = useRef(null);

    useEffect(() => {
        const fetchAndSetMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + "movieList");
                setMovieListAsync(asyncKey);

                const updatedMovieLists = await AsyncStorage.getItem(movieListAsync);

                if (updatedMovieLists) {
                    setSavedMovieList(JSON.parse(updatedMovieLists));
                    setDraggedMovieList(JSON.parse(updatedMovieLists));
                    setMovieListCounter(JSON.parse(updatedMovieLists).length);
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };
        fetchAndSetMovies();
    }, [movieListAsync]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 6000);
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    const handleFabPress = () => {
        setModalVisible(true);
    };

    const handleRemovePress = () => {
        if (draggedMovieList.length > 0) {
            setModalRemoveVisible(true);
        } else {
            setModalRemoveVisible(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCardName("");
        setEr("");
        setPlatformVisible(false);
        setPicturesVisible(false);
        setSwiperVisible2(false);
        setSwiperVisible(false);
    };

    const closeRemoveModal = () => {
        setModalRemoveVisible(false);
    };

    const saveList = async () => {
        if (!cardName) {
            setEr(Translations[language].cardNameNotEmpty);
            return;
        }

        if (cardName.length < 4 || cardName.length > 40) {
            setEr(Translations[language].cardNameLength);
            return;
        }
        if (!selectedImage) {
            setEr(Translations[language].selectCardBackground);
            return;
        }
        // Verileri bir obje olarak hazırla
        const listData = {
            id: cardName,
            listName: cardName,
            cardImage: selectedImage,
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingMovies = await AsyncStorage.getItem(movieListAsync);
            let updatedMovieLists = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedMovieLists = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedMovieLists.unshift(listData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(movieListAsync, JSON.stringify(updatedMovieLists));

            // Kaydedilen filmleri güncelle
            setSavedMovieList(updatedMovieLists);
            setDraggedMovieList(updatedMovieLists);

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

    const filterMovieListByName = (list, searchMovie) => {
        return list.filter((item) => item.listName.toLowerCase().includes(searchMovie.toLowerCase()));
    };

    const deleteCard = async (index) => {
        const updatedMovieLists = [...draggedMovieList];
        updatedMovieLists.splice(index, 1);
        setDraggedMovieList(updatedMovieLists);
        AsyncStorage.setItem(movieListAsync, JSON.stringify(updatedMovieLists))
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
            case "apptv":
                return require("../../../images/apptv.png");
            case "hbmax":
                return require("../../../images/hbmax.png");
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
            case "6":
                return require("../../../images/6.png");
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
    }

    function handleDragEnd({ data }) {
        try {
            AsyncStorage.setItem(movieListAsync, JSON.stringify(data));
            setSavedMovieList(data);
            setDraggedMovieList(data);
        } catch (error) {
            console.log('Hata:', error);
        }
    }

    function goToListDetails(listName) {
        navigation.navigate("MovieListDetails", { listName });
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider >
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container} behavior="height" >
                        <View style={styles.filterContainer} >
                            <View style={styles.search} >
                                <Icon name="search" size={16} color={"black"} style={styles.icon} />
                                <TextInput style={{ fontSize: 13, flex: 1 }} fontSize={12} placeholder={Translations[language].filterCard} placeholderTextColor={"black"} value={searchMovie}
                                    onChangeText={setSearchMovie} />
                            </View>
                            <TouchableOpacity onPress={handleRemovePress} style={styles.removeBox}>
                                <Icon name="remove-circle" size={16} color={"red"} />
                                <Text style={styles.removeText}>{Translations[language].remove}</Text>
                            </TouchableOpacity>
                        </View>
                        {isVisible &&
                            <Text style={styles.info}>{Translations[language].info1} </Text>
                        }
                        <View style={{ flex: 1 }} >
                            <DraggableFlatList
                                ref={ref}
                                data={filterMovieListByName(draggedMovieList, searchMovie)}
                                keyExtractor={(item) => item.id}
                                onDragEnd={handleDragEnd}
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
                        </View>

                        <TouchableOpacity onPress={handleFabPress} style={styles.fab}>
                            <Icon style={styles.fabIcon} name="add" size={24} color={"white"} />
                            <Text style={styles.fabColor} >{Translations[language].addCard}</Text>
                        </TouchableOpacity>
                        
                    </KeyboardAvoidingView>

                    <Modal
                        visible={modalRemoveVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={closeRemoveModal}
                    >
                        <TouchableOpacity
                            style={styles.modalBackground}
                            activeOpacity={1}
                            onPress={closeRemoveModal}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.modalContent}
                                    onPress={() => { }}
                                >
                                    <View>
                                        <View>
                                            <Text style={styles.cardName} > {Translations[language].removeCard} </Text>
                                            <View style={styles.seperator2} />
                                            <ScrollView>
                                                <View style={styles.content}>
                                                    {draggedMovieList
                                                        .map((card, index) => (
                                                            <RemoveCard key={card.id} name={card.listName} onPressDelete={() => deleteCard(index)} />
                                                        ))}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>

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
                                            <Text style={styles.cardName} >{Translations[language].cardName} </Text>
                                            <View style={styles.searchMovie} >
                                                <TextInput
                                                    value={cardName}
                                                    autoCapitalize="sentences"
                                                    onChangeText={setCardName}
                                                    maxLength={40}
                                                    placeholder={Translations[language].writeCardName}
                                                    style={styles.searchText}
                                                />
                                            </View>
                                            <View style={styles.seperator2} />
                                            <Text style={styles.imageBack} > {Translations[language].cardBackground} </Text>
                                            <TouchableWithoutFeedback onPress={openPlatform}>
                                                <Text style={styles.text}> -&gt; {Translations[language].videoStream}</Text>
                                            </TouchableWithoutFeedback>
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
                                                    <TouchableOpacity onPress={() => handleImageClick("apptv")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/apptv.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleImageClick("hbmax")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/hbmax.png")}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                        <TouchableOpacity onPress={openPictures}>
                                            <Text style={styles.text}> -&gt; {Translations[language].picturesCategories}</Text>
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
                                                    <TouchableOpacity onPress={() => handleImageClick2("6")}>
                                                        <Image
                                                            style={styles.miniImg}
                                                            resizeMode="contain"
                                                            source={require("../../../images/6.png")}
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
                                                <Text style={styles.preview} >{Translations[language].preview}</Text>
                                                <View style={styles.slide}>
                                                    <Image
                                                        style={styles.image}
                                                        resizeMode="contain"
                                                        source={getPlatformImage(selectedPlatform)}
                                                    />
                                                </View>
                                            </View>
                                        )}

                                        {swiperVisible2 && (
                                            <View style={styles.body}>
                                                <Text style={styles.preview} >{Translations[language].preview}</Text>
                                                <View style={styles.slide}>
                                                    <Image
                                                        style={styles.image}
                                                        resizeMode="contain"
                                                        source={getCategoryImage(selectedPlatform)}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                        {err.length > 0 &&
                                            <Text style={{ color: "red", paddingTop: 8, textAlign: "center" }} > {err} </Text>
                                        }
                                        <TouchableOpacity style={styles.button} onPress={saveList} >
                                            <Text style={styles.buttonText} >{Translations[language].saveCard}</Text>
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

export default MyMovieList;

