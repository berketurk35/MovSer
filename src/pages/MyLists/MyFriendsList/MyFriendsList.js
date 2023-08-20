import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useStats } from "../../../Context/StatContext";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from "./MyFriendsListStyles";

import ListCard from "../../../components/Card/ListCard/ListCard";
import RemoveCard from "../../../components/Card/RemoveCard/RemoveCard";

import Icon from "react-native-vector-icons/Ionicons";
import Translations from "../../../languages/Translation";

import AsyncStorage from '@react-native-async-storage/async-storage';

function MyFriendsList({ navigation }) {

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

    const [draggedMovieList, setDraggedMovieList] = useState([]);

    const { movieListCounter, setMovieListCounter } = useStats();
    const { language, setLanguage } = useStats();

    const ref = useRef(null);

    useEffect(() => {
        const fetchAndSetMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey  = (userID + "movieList");
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

    const handleRemovePress = () => {
        if(draggedMovieList.length > 0) { 
            setModalRemoveVisible(true);
        } else {
            setModalRemoveVisible(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCardName("");
        setPlatformVisible(false);
        setPicturesVisible(false);
        setSwiperVisible2(false);
        setSwiperVisible(false);
    };

    const closeRemoveModal = () => {
        setModalRemoveVisible(false);
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
                        <View style={{ flexDirection: "row", backgroundColor: "#8c8c8c", opacity: 0.7 }} >
                            <View style={styles.search} >
                                <Icon name="search" size={18} color={"black"} style={styles.icon} />
                                <TextInput style={{ fontSize: 13 }} placeholder={Translations[language].filterCard} placeholderTextColor={"black"} value={searchMovie}
                                    onChangeText={setSearchMovie} />
                            </View>
                            <TouchableOpacity onPress={handleRemovePress} style={styles.removeBox}>
                                <Icon name="remove-circle" size={16} color={"red"} />
                                <Text style={styles.removeText}>{Translations[language].remove}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.info}>
                            {Translations[language].info1} </Text>
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
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
};

export default MyFriendsList;

