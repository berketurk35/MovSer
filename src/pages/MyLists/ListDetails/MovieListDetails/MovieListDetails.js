import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import styles from "./MovieListDetailsStyles";
import { Dimensions } from "react-native";

import Input from "../../../../components/Input/Input";
import FriendBox from "../../../../components/FriendBox/FriendBox";

import { FAB } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import IconFont from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

import Translations from "../../../../languages/Translation";
import { useStats } from "../../../../Context/StatContext";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

import axios from "react-native-axios";

const supabaseUrl = "https://ukdilyiayiqrwhbveugn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZGlseWlheWlxcndoYnZldWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NjAxMTMsImV4cCI6MjAwNzIzNjExM30.gFHaGvPtHMPp3sm8hHPG7MtV6TEQ4cve6ob9WNhvz2c";

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function MovieListDetails({ navigation, route }) {

    const { listName } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [guestVisible, setGuestVisible] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [duration, setDuration] = useState("");
    const [listNameAsync, setListNameAsync] = useState("");
    const [shareModal, setShareModal] = useState("");
    const [messageModal, setMessageModal] = useState(false);
    const [friends, setFriends] = useState([]);
    const [friendId, setFriendId] = useState("");
    const [message, setMessage] = useState("");

    const [draggedMovies, setDraggedMovies] = useState([]);

    const { language, setLanguage } = useStats();

    const ref = useRef(null);

    useEffect(() => {
        const fetchSavedMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + listName);
                setListNameAsync(asyncKey);

                const movies = await AsyncStorage.getItem(listNameAsync);
                if (movies) {
                    setSavedMovies(JSON.parse(movies));
                    setDraggedMovies(JSON.parse(movies));
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };
        fetchSavedMovies();
        fetchFriends();
    }, [listNameAsync]);

    const fetchFriends = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem("userId");

            // Mevcut kullanıcının arkadaşlarını çekin
            const { data: friendsData, error: friendsError } = await supabase
                .from("friends")
                .select("friend_id")
                .eq("user_id", currentUserId);

            if (friendsError) {
                console.error("Arkadaşları alınırken hata:", friendsError);
                return;
            }

            const friendIds = friendsData.map(friend => friend.friend_id);

            // Arkadaşlarımın detaylarını çekin
            const { data: friendsDetailsData, error: friendsDetailsError } = await supabase
                .from("users")
                .select("*")
                .in("userID", friendIds);

            if (friendsDetailsError) {
                console.error("Arkadaş detayları alınırken hata:", friendsDetailsError);
                return;
            }

            setFriends(friendsDetailsData);
        } catch (error) {
            console.error("Arkadaşları alınırken hata:", error);
        }
    };

    const shareMovieList = async () => {
        setMessageModal(false);
        setShareModal(false);
        try {
            const currentUserId = await AsyncStorage.getItem("userId");

            const { data: existingShare, error: existingShareError } = await supabase
                .from("shared_lists")
                .select("id")
                .eq("user_id", currentUserId)
                .eq("friend_id", friendId)
                .eq("listType", "Movie")
                .eq("listName", listName)

            if (existingShareError) {
                console.error("Paylaşım var mı kontrol edilirken hata:", existingShareError);
                return;
            }

            if (existingShare && existingShare.length > 0) {
                console.log("Bu liste daha önce paylaşıldı.");
                return;
            }

            const { data: userDetailsData, error: userDetailsError } = await supabase
                .from("users")
                .select("*")
                .in("userID", currentUserId);

            const { data, error } = await supabase
                .from("shared_lists")
                .insert([
                    {
                        user_id: currentUserId,
                        friend_id: friendId,
                        listType: "Movie",
                        listName: listName,
                        content_ids: draggedMovies.map(item => item.movieId),
                        user_message: message,
                        fullName: userDetailsData.fullName
                    }
                ])
            if (!error) {
                console.log("Veri başarılı gitti:");
            }

            if (error) {
                console.error("Film listesi paylaşılırken hata oldu", error);
                return;
            }

        } catch (error) {
            console.error("Film listesi alınırken hata:", error);
        }

    };

    const handleFabPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setGuestVisible(false);
        setSearchResults("");
        setSelectedMovie("");
        setSearchText("");
    };

    const saveMovie = async () => {
        // Verileri bir obje olarak hazırla
        const movieData = {
            movieId: selectedMovie.id,
            movieName: selectedMovie.title,
            movieDate: formatDate(selectedMovie.release_date),
            movieVote: selectedMovie.vote_average.toFixed(1),
            movieCategory: categoryText,
            moviePoster: selectedMovie.poster_path,
            movieTime: duration
        };

        try {
            // Daha önce kaydedilen filmleri al
            const existingMovies = await AsyncStorage.getItem(listNameAsync);
            let updatedListDetails = [];

            if (existingMovies) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedListDetails = JSON.parse(existingMovies);
            }

            // Yeni filmi ekle
            updatedListDetails.unshift(movieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(listNameAsync, JSON.stringify(updatedListDetails));

            // Kaydedilen filmleri güncelle
            setSavedMovies(updatedListDetails);
            setDraggedMovies(updatedListDetails);

            // Modalı kapat
            setSearchResults("");
            setSelectedMovie("");
            setSearchText("");
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const filterMovieListByName = (list, searchMovie) => {
        return list.filter((item) => item.movieName.toLowerCase().includes(searchMovie.toLowerCase()));
    };

    const searchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
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

    const getMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                },
            });
            const runtime = response.data.runtime;
            const formattedDuration = formatDuration(runtime);
            setDuration(formattedDuration);

        } catch (error) {
            console.error(error);
        }
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours} h ${remainingMinutes} m`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('tr-TR'); // tr-TR, Türkiye'nin bölgesel kodudur

        return formattedDate;
    };

    const fetchGenreNames = async (genreIds) => {
        try {
            const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
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
        searchMovies();
    };

    const handleMovieSelect = async (movie) => {

        setSelectedMovie(movie);
        setSearchText(movie.title);
        getMovieDetails(movie.id);
        // Film tür adlarını al
        const genreNames = await fetchGenreNames(movie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
    };

    const handleSearchBarPress = () => {
        setSelectedMovie(null);
        setGenreNames([]);
    };

    const handlePressShare = async () => {
        const currentUserId = await AsyncStorage.getItem("userId");
        if (currentUserId === "guest") {
            setShareModal(false);
            setGuestVisible(true);
        } else {
            setShareModal(true);
        }
    };

    const handlePressMessageBox = async (friend_id) => {
        setMessageModal(true);
        setFriendId(friend_id);
    };

    const closeMessageModal = () => {
        setMessage("");
        setMessageModal(false);
    };

    const closeShareModal = () => {
        setShareModal(false);
    };

    const handleMovieDelete = (item) => {
        Alert.alert(
            'Film Silme',
            `"${item.movieName}" Filmini silmek istediğinize emin misiniz?`,
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteMovie(item),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteMovie = async (item) => {
        const updatedListDetails = savedMovies.filter((m) => m.movieId !== item.movieId);
        setSavedMovies(updatedListDetails);
        AsyncStorage.setItem(listNameAsync, JSON.stringify(updatedListDetails))
            .then(() => {
                console.log('Film başarıyla silindi.');
            })
            .catch((error) => {
                console.log('Film silinirken bir hata oluştu:', error);
            });
    };

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleMovieSelect(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                    style={{ width: 50, height: 75, margin: 10 }}
                />
                <View>
                    <Text>{item.title} </Text>
                    <Text style={{ fontSize: 10, paddingTop: 6 }} >{formatDate(item.release_date)} </Text>
                </View>

            </View>
        </TouchableOpacity>
    );

    function back() {
        navigation.goBack();
    };

    function handleDragEnd({ data }) {
        try {
            AsyncStorage.setItem(listNameAsync, JSON.stringify(data));
            setSavedMovies(data);
            setDraggedMovies(data);
        } catch (error) {
            console.log('Hata:', error);
        }
    }

    function formatMovieName(name, maxLength) {
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength - 3) + '...';
        }
    }

    const renderItem = ({ item, drag }) => {

        const sName = item.movieName;
        const maxLengthToShow = 34;

        const formattedMovieName = formatMovieName(sName, maxLengthToShow);

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
                                                source={{ uri: `${IMAGE_BASE_URL}${item.moviePoster}` }}
                                                resizeMode="contain"
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={styles.rightCard}>
                                            <View style={styles.movieNameCard} >
                                                <Text style={styles.textMovie} >
                                                    {formattedMovieName}
                                                </Text>
                                            </View>
                                            <Text style={styles.textCategory}>
                                                {item.movieCategory}
                                            </Text>
                                            <View style={styles.topCard}>
                                                <IconMaterial name={"date-range"} color={"yellow"} size={16} style={styles.iconx} />
                                                <Text style={styles.textDate}>
                                                    {item.movieDate}
                                                </Text>
                                                <Text style={styles.textDate}>
                                                    |    {item.movieTime}
                                                </Text>
                                            </View>
                                            <View style={styles.topCard} >
                                                <View style={{ flexDirection: "row", flex: 1 }} >
                                                    <Icon name={"star"} color={"green"} size={16} style={styles.iconx} />
                                                    <Text style={styles.textVote}>
                                                        {item.movieVote}
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => handleMovieDelete(item)} style={styles.icon2}>
                                                <IconMaterial name={"cancel"} color={"#ff675c"} size={16} />
                                            </TouchableOpacity>
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

    function goToRegisterPage() {
        navigation.navigate("Register");
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
                            <Icon name="search" size={18} color={"black"} style={styles.icon} />
                            <TextInput style={{ fontSize: 13 }} placeholder={Translations[language].filterMovie} placeholderTextColor={"black"} value={searchMovie}
                                onChangeText={setSearchMovie} />
                        </View>
                        <TouchableOpacity onPress={handlePressShare} style={styles.shareBox}>
                            <IconFont name="share-square" size={20} color={"green"} />
                            <View>
                                <Text style={styles.shareText}> {Translations[language].share} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.seperator} />
                    <Text style={styles.info}>
                        {Translations[language].info2}</Text>
                    <View style={{ flex: 1 }} >
                        <DraggableFlatList
                            ref={ref}
                            data={filterMovieListByName(draggedMovies, searchMovie)}
                            keyExtractor={(item) => item.movieId}
                            onDragEnd={handleDragEnd}
                            renderItem={renderItem}
                        />
                    </View>
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label={Translations[language].addMovie}
                        color="white"
                        onPress={handleFabPress}
                    />

                </KeyboardAvoidingView>

                <Modal
                    visible={guestVisible}
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
                                <View style={styles.guestInfoBox} >
                                    <Text style={styles.guestInfoTitle} >{Translations[language].hiUser}</Text>
                                    <Text>{Translations[language].guestInfo1}</Text>
                                    <TouchableOpacity onPress={goToRegisterPage} style={styles.guestInfoButton}>
                                        <Text style={styles.guestInfoButtonText}>{Translations[language].registerNow}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Modal
                    visible={shareModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closeShareModal}
                >
                    <TouchableOpacity
                        style={styles.modalBackground}
                        activeOpacity={1}
                        onPress={closeShareModal}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.modalContent}
                                onPress={() => { }}
                            >
                                <View>
                                    <View>
                                        <Text style={styles.friendList} > {Translations[language].friendList} </Text>
                                        <View style={styles.seperator2} />
                                        <ScrollView>
                                            {friends.map(friend => (
                                                <FriendBox
                                                    key={friend.userID}
                                                    profilePhoto={friend.profile_photo_url}
                                                    userName={friend.userName}
                                                    fullName={friend.fullName}
                                                    iconShare={"share-square-o"}
                                                    pressShare={() => handlePressMessageBox(friend.userID)}
                                                />
                                            ))
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Modal
                    visible={messageModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closeMessageModal}
                >
                    <TouchableOpacity
                        style={styles.modalBackground}
                        activeOpacity={1}
                        onPress={closeMessageModal}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.modalContent}
                                onPress={() => { }}
                            >
                                <View>
                                    <View>
                                        <Text style={styles.friendList} > {Translations[language].writeMessage}</Text>
                                        <View style={styles.seperator2} />
                                        <TextInput
                                            style={styles.input}
                                            multiline
                                            numberOfLines={4}
                                            maxLength={160} 
                                            value={message}
                                            onChangeText={setMessage}
                                            placeholder="Mesajınızı buraya yazın (max 160) "
                                        />
                                        <TouchableOpacity onPress={shareMovieList} style={styles.button}>
                                            <Text style={styles.buttonText2} >{Translations[language].shareList}</Text>
                                        </TouchableOpacity>
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
                                    <View style={styles.searchMovie} >
                                        <Icon name={"search"} size={16} color="black" style={styles.icon} />
                                        <TextInput
                                            value={searchText}
                                            onChangeText={handleTextChange}
                                            placeholder={Translations[language].searchMovie}
                                            onFocus={handleSearchBarPress}
                                            style={styles.searchText}
                                        />
                                    </View>

                                    {selectedMovie ? (
                                        <View>
                                            <View style={styles.seperator2} />
                                            <Input label={Translations[language].selectedMovie} text={selectedMovie.title} />
                                            <View style={{ flexDirection: "row" }} >
                                                <View style={{ flex: 1, marginRight: 10, }} >
                                                    <Input label={Translations[language].releaseDate} text={formatDate(selectedMovie.release_date)} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Input label={Translations[language].score} text={selectedMovie.vote_average.toFixed(1)} />
                                                </View>
                                            </View>
                                            <Input label={Translations[language].categories} text={categoryText} />

                                            <TouchableOpacity style={styles.button} onPress={saveMovie} >
                                                <Text style={styles.buttonText} >{Translations[language].saveMovie}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <FlatList
                                            data={searchResults}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={renderMovieItem}
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

export default MovieListDetails;

