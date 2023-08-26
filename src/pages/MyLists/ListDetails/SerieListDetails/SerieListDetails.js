import React, { useState, useEffect, useRef, forwardRef } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, FlatList, Image } from "react-native";
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import styles from "./SerieListDetailsStyles";
import { Dimensions } from "react-native";

import Input from "../../../../components/Input/Input";
import FriendBoxShare from "../../../../components/FriendBoxShare/FriendBoxShare";
import Toast from 'react-native-toast-message';

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

function SerieListDetails({ navigation, route }) {

    const { listName } = route.params;
    const serieListName = (listName + "serie");

    const [modalVisible, setModalVisible] = useState(false);
    const [guestVisible, setGuestVisible] = useState(false);
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
    const [listNameAsync, setListNameAsync] = useState("");
    const [shareModal, setShareModal] = useState("");
    const [messageModal, setMessageModal] = useState(false);
    const [friends, setFriends] = useState([]);
    const [friendId, setFriendId] = useState("");
    const [message, setMessage] = useState("");
    const [draggedSeries, setDraggedSeries] = useState([]);
    const [searchFriend, setSearchFriend] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const { language, setLanguage } = useStats();

    const ref = useRef(null);

    useEffect(() => {
        const fetchSavedSeries = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + serieListName);
                setListNameAsync(asyncKey);

                const series = await AsyncStorage.getItem(listNameAsync);
                if (series) {
                    setSavedSeries(JSON.parse(series));
                    setDraggedSeries(JSON.parse(series));
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };
        fetchSavedSeries();
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
            text1: 'Liste başarılı bir şekilde paylaşıldı.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 10
        });
    };

    const showErrorMessage = () => {
        Toast.show({
            type: 'error',
            text1: 'Bu liste daha önce paylaşıldı.',
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
                .eq("listType", "Serie")
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
            
            const { data: userDetailsData, error: userDetailsError } = await supabase
                .from("users")
                .select("*")
                .eq("userID", currentUserId);
    
            const { data, error } = await supabase
                .from("shared_lists")
                .insert([
                    {
                        user_id: currentUserId,
                        friend_id: friendId,
                        listType: "Serie",
                        listName: listName,
                        content_ids: draggedSeries.map(item => item.serieId),
                        user_message: message,
                        fullName: userDetailsData[0].fullName
                    }
                ])
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
        setSelectedSerie("");
        setSearchText("");
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
            const existingSeries = await AsyncStorage.getItem(listNameAsync);
            let updatedListDetails = [];

            if (existingSeries) {
                // Eğer daha önce kaydedilen filmler varsa, onları güncelle
                updatedListDetails = JSON.parse(existingSeries);

                const isAlreadyAdded = updatedListDetails.some(
                    (serie) => serie.serieId === serieData.serieId
                );

                if (isAlreadyAdded) {
                    console.log("Bu film zaten eklenmiş.");
                    closeModal(); 
                    return;
                }
            }

            // Yeni filmi ekle
            updatedListDetails.unshift(serieData);

            // Filmleri AsyncStorage'e kaydet
            await AsyncStorage.setItem(listNameAsync, JSON.stringify(updatedListDetails));

            // Kaydedilen filmleri güncelle
            setSavedSeries(updatedListDetails);
            setDraggedSeries(updatedListDetails);

            // Modalı kapat
            setSearchResults("");
            setSelectedSerie("");
            setSearchText("");
            closeModal();
        } catch (error) {
            console.log('Hata: ', error);
        }
    };

    const filterSerieListByName = (list, searchSerie) => {
        return list.filter((item) => item.serieName.toLowerCase().includes(searchSerie.toLowerCase()));
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
        const genreNames = await fetchGenreNames(serie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
    };

    const handleSearchBarPress = () => {
        setSelectedSerie(null);
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
        AsyncStorage.setItem(listNameAsync, JSON.stringify(updatedListDetails))
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
                    <Text style={{ fontSize: 10, paddingTop: 6 }} >{formatDate(item.first_air_date)} </Text>
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
            setSavedSeries(data);
            setDraggedSeries(data);
        } catch (error) {
            console.log('Hata:', error);
        }
    }

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
                                                <IconMaterial name={"analytics"} color={"pink"} size={16} style={styles.iconx} />
                                                <Text style={styles.textSeasons}>
                                                    {item.serieSeasons} {Translations[language].season}
                                                </Text>
                                                <Text style={styles.textSeasons}>
                                                    |    {item.serieEpisodes} {Translations[language].episode}
                                                </Text>
                                            </View>
                                            <View style={styles.topCard} >
                                                <View style={{ flexDirection: "row", flex: 1 }} >
                                                    <Icon name={"star"} color={"green"} size={16} style={styles.iconx} />
                                                    <Text style={styles.textVote}>
                                                        {item.serieVote}
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => handleSerieDelete(item)} style={styles.icon2}>
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
                            <TextInput style={{ fontSize: 13 }} placeholder={Translations[language].filterSerie} placeholderTextColor={"black"} value={searchSerie}
                                onChangeText={setSearchSerie} />
                        </View>
                        <TouchableOpacity onPress={handlePressShare} style={styles.shareBox}>
                            <IconFont name="share-square" size={20} color={"green"} />
                            <View>
                                <Text style={styles.shareText}>{Translations[language].share}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isVisible &&
                            <Text style={styles.info}>{Translations[language].info3} </Text>
                        }
                    <View style={{ flex: 1 }} >
                        <DraggableFlatList
                            ref={ref}
                            data={filterSerieListByName(draggedSeries, searchSerie)}
                            keyExtractor={(item) => item.serieId}
                            onDragEnd={handleDragEnd}
                            renderItem={renderItem}
                        />
                    </View>
                    <ForwardedToast />
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label={Translations[language].addSerie}
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
                                <Text style={styles.friendList} > {Translations[language].friendList} </Text>
                                <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                                    <View style={styles.search} >
                                        <Icon name="search" size={18} color={"black"} style={styles.icon} />
                                        <TextInput style={{ fontSize: 13, flex: 1 }} placeholder={Translations[language].filterFriend} placeholderTextColor={"black"} value={searchFriend}
                                            onChangeText={setSearchFriend} />
                                    </View>
                                </View>
                                <View style={styles.seperator2} />
                                <FlatList
                                    data={friends.filter(
                                        (friend) =>
                                            friend.userName
                                                .toLowerCase()
                                                .includes(searchFriend.toLowerCase())
                                    )}
                                    keyExtractor={(friend) => friend.userID}
                                    renderItem={({ item: friend }) => (
                                        <FriendBoxShare
                                            profilePhoto={friend.profile_photo_url}
                                            userName={friend.userName}
                                            fullName={friend.fullName}
                                            iconShare={"share-square-o"}
                                            pressShare={() => handlePressMessageBox(friend.userID)}
                                        />
                                    )}
                                    style={{ height: "70%" }}
                                />
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
                                            placeholder={Translations[language].searchSerie}
                                            onFocus={handleSearchBarPress}
                                            style={styles.searchText}
                                        />
                                    </View>

                                    {selectedSerie ? (
                                        <View>
                                            <View style={styles.seperator2} />
                                            <Input label={Translations[language].selectedSerie} text={selectedSerie.name} />
                                            <View style={{ flexDirection: "row" }} >
                                                <View style={{ flex: 1, marginRight: 10, }} >
                                                    <Input label={Translations[language].releaseDate} text={formatDate(selectedSerie.first_air_date)} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Input label={Translations[language].score} text={selectedSerie.vote_average.toFixed(1)} />
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row" }} >
                                                <View style={{ flex: 1, marginRight: 10, }} >
                                                    <Input label={Translations[language].numberSeasons} text={seasons} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Input label={Translations[language].numberEpisodes} text={episodes} />
                                                </View>
                                            </View>
                                            <Input label={Translations[language].categories} text={categoryText} />

                                            <TouchableOpacity style={styles.button} onPress={saveSerie} >
                                                <Text style={styles.buttonText} >{Translations[language].saveSerie}</Text>
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

