import React, { useState, useEffect, useRef, forwardRef } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import styles from "./MovieListDetailsStyles";
import { Dimensions } from "react-native";

import FriendBoxShare from "../../../../components/FriendBoxShare/FriendBoxShare";
import Toast from 'react-native-toast-message';
import SearchFilter3 from "../../../../components/SearchFilter/SearchFilter3/SearchFilter3";
import Fab from "../../../../components/Fab/Fab";
import GuestInfoModal from "../../../../components/Modal/GuestInfoModal/GuestInfoModal";
import CustomMovieModal from "../../../../components/Modal/CustomMovieModal/CustomMovieModal";
import CustomHeader from "../../../../components/Header/CustomHeader";
import MovSerCard from "../../../../components/Card/MoviesCard/MoviesCard";
import ShareFriendListModal from "../../../../components/Modal/ShareFriendListModal/ShareFriendListModal";

import Icon from "react-native-vector-icons/Ionicons";

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
    const [searchFriend, setSearchFriend] = useState('');

    const [draggedMovies, setDraggedMovies] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 6000);
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    const ForwardedToast = forwardRef((props, ref) => {
        return <Toast ref={ref} {...props} />;
    });

    const showToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: Translations[language].toastListSharedSuccess,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 10
        });
    };

    const showErrorMessage = () => {
        Toast.show({
            type: 'error',
            text1: Translations[language].toastListAlreadyShared,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 10
        });
    };

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
                showErrorMessage();
                return;
            }
            const { data: sentFriendsData, error: sentFriendsError } = await supabase
                .from("users")
                .select("*")
                .eq("userID", currentUserId);

            console.log("FriendsData", sentFriendsData);

            if (sentFriendsError) {
                console.error("Arkadaş detayları alınırken hata:", sentFriendsError);
                return;
            }

            const { data, error } = await supabase
                .from("shared_lists")
                .insert(
                    {
                        user_id: currentUserId,
                        friend_id: friendId,
                        listType: "Movie",
                        listName: listName,
                        content_ids: draggedMovies.map(item => item.movieId),
                        user_message: message,
                        fullName: sentFriendsData[0].fullName
                    }
                )
            if (!error) {
                console.log("Veri başarılı gitti:");
                showToastMessage();
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

                const isAlreadyAdded = updatedListDetails.some(
                    (movie) => movie.movieId === movieData.movieId
                );

                if (isAlreadyAdded) {
                    console.log("Bu film zaten eklenmiş.");
                    closeModal();
                    return;
                }
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

    const renderItem = ({ item, drag }) => {

        const { isActive } = useOnCellActiveAnimation();

        return (
            <ScaleDecorator>
                <OpacityDecorator activeOpacity={1} >
                    <ShadowDecorator>
                        <TouchableOpacity onLongPress={drag} activeOpacity={1} style={{ height: Dimensions.get("window").height / 5, elevation: isActive ? 60 : 0, shadowColor: "white", }} >
                            <Animated.View>
                                <MovSerCard
                                    key={item.movieId}
                                    movieName={item.movieName}
                                    date={item.movieDate}
                                    vote={item.movieVote}
                                    category={item.movieCategory}
                                    poster={item.moviePoster}
                                    time={item.movieTime}
                                    onPressDelete={() => handleMovieDelete(item)}
                                />
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
                <CustomHeader onPress={back} listName={listName} />
                <KeyboardAvoidingView style={styles.container} behavior="height" >
                    <SearchFilter3
                        placeholder={Translations[language].filterMovie}
                        value={searchMovie}
                        onChangeText={setSearchMovie}
                        onPress={handlePressShare}
                        text={Translations[language].share}
                    />
                    {isVisible &&
                        <Text style={styles.info}>{Translations[language].info2}</Text>
                    }
                    <View style={{ flex: 1 }} >
                        <DraggableFlatList
                            ref={ref}
                            data={filterMovieListByName(draggedMovies, searchMovie)}
                            keyExtractor={(item) => item.movieId}
                            onDragEnd={handleDragEnd}
                            renderItem={renderItem}
                        />
                    </View>
                    <ForwardedToast />

                    <Fab onPress={handleFabPress} text={Translations[language].addMovie} />

                </KeyboardAvoidingView>

                <GuestInfoModal
                    visible={guestVisible}
                    closeModal={closeModal}
                    onPress={goToRegisterPage}
                    Translations={Translations}
                    language={language}
                />

                <ShareFriendListModal
                    visible={shareModal}
                    closeShareModal={closeShareModal}
                    searchFriend={searchFriend}
                    setSearchFriend={setSearchFriend}
                    Translations={Translations}
                    language={language}
                    friends={friends}
                    handlePressMessageBox={handlePressMessageBox}
                />

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
                                            placeholder={Translations[language].writeYourMessage}
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

                <CustomMovieModal
                    visible={modalVisible}
                    closeModal={closeModal}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    searchResults={searchResults}
                    setSelectedMovie={setSelectedMovie}
                    selectedMovie={selectedMovie}
                    handleTextChange={handleTextChange}
                    handleSearchBarPress={handleSearchBarPress}
                    handleMovieSelect={handleMovieSelect}
                    saveMovie={saveMovie}
                    Translations={Translations}
                    language={language}
                    formatDate={formatDate}
                    categoryText={categoryText}
                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    )
};

export default MovieListDetails;

