import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, KeyboardAvoidingView, FlatList } from "react-native";
import { useStats } from "../../../Context/StatContext";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from "./MyFriendsListStyles";

import FriendListCard from "../../../components/Card/FriendListCard/FriendListCard";
import RemoveCard from "../../../components/Card/RemoveCard/RemoveCard";

import SearchFilter2 from "../../../components/SearchFilter/SearchFilter2/SearchFilter2";

import Translations from "../../../languages/Translation";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

function MyFriendsList({ navigation }) {

    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [savedMovieList, setSavedMovieList] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');

    const [friendListAsync, setFriendListAsync] = useState("");

    const { language, setLanguage } = useStats();


    useEffect(() => {
        const fetchAndSetMovies = async () => {
            try {
                const userID = await AsyncStorage.getItem('userId');
                const asyncKey = (userID + "friendLists");
                setFriendListAsync(asyncKey);

                const updatedFriendLists = await AsyncStorage.getItem(friendListAsync);
                if (updatedFriendLists) {
                    setSavedMovieList(JSON.parse(updatedFriendLists));
                }
            } catch (error) {
                console.log('Hata: ', error);
            }
        };

        fetchAndSetMovies();
        fetchFriendList();
    }, [friendListAsync]);

    const fetchFriendList = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem("userId");

            const { data, error } = await supabase
                .from("shared_lists")
                .select("*")
                .eq("friend_id", currentUserId)

            setSavedMovieList(data);

        } catch (error) {
            console.error("hata:", error);
        }
    };

    const handleRemovePress = () => {
        if (savedMovieList.length > 0) {
            setModalRemoveVisible(true);
        } else {
            setModalRemoveVisible(false);
        }
    };

    const closeRemoveModal = () => {
        setModalRemoveVisible(false);
    };

    const deleteCard = async (listName, message) => {
        const currentUserId = await AsyncStorage.getItem("userId");

        try {
            const { data, error } = await supabase
                .from("shared_lists")
                .delete()
                .eq("friend_id", currentUserId)
                .eq("listName", listName)
                .eq("user_message", message);

            if (error) {
                console.error("Satır silinirken hata:", error);
                return;
            }
            console.log("Satır başarıyla silindi.");
            setModalRemoveVisible(false);
        } catch (error) {
            console.error("İşlem sırasında bir hata oluştu:", error);
        }
    };

    function goToListDetails(listName, listType, uId, contentIds) {
        if (listType === "Movie") {
            navigation.navigate("FriendListDetails", { listName, listType, uId, contentIds });
        } else {
            navigation.navigate("FriendListDetails2", { listName, listType, uId, contentIds });
        }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider >
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container} behavior="height" >
                        <SearchFilter2
                            placeholder={Translations[language].filterCard}
                            value={searchMovie}
                            onChangeText={setSearchMovie}
                            onPress={handleRemovePress}
                            text={Translations[language].remove}
                        />
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={savedMovieList.filter(
                                    (item) =>
                                        item.listName.toLowerCase().includes(searchMovie.toLowerCase())
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <FriendListCard
                                        key={item.id}
                                        cardName={item.listName}
                                        listType={item.listType}
                                        cardMessage={item.user_message}
                                        fullName={item.fullName}
                                        onPressDetail={() =>
                                            goToListDetails(
                                                item.listName,
                                                item.listType,
                                                item.user_id,
                                                item.content_ids
                                            )
                                        }
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
                                                    {savedMovieList
                                                        .map((card, index) => (
                                                            <RemoveCard key={card.id} name={card.listName} onPressDelete={() => deleteCard(card.listName, card.user_message)} />
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

