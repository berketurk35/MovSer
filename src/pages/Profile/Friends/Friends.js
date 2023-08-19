import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import FriendBox from "../../../components/FriendBox/FriendBox";

import styles from "./FriendsStyles";
import Translations from "../../../languages/Translation";
import { useStats } from "../../../Context/StatContext";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

import AsyncStorage from "@react-native-async-storage/async-storage";

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

function Friends({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sentRequist, setSentRequist] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [isAlreadySent, setIsAlreadySent] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const { language, setLanguage } = useStats();

    useEffect(() => {
        if (searchUser) {
            searchUsers();
        }
        else {
            console.log("No users found");
        }
        async function fetchSentRequests() {
            try {
                const currentUserId = await AsyncStorage.getItem("userId");
                const { data, error } = await supabase
                    .from("friendship_requests")
                    .select("*")
                    .eq("user_id", currentUserId)
                    .eq("status", "pending");

                if (error) {
                    console.error("Arkadaşlık istekleri alınırken hata:", error);
                    return;
                }
                setSentRequests(data);
                setInitialLoading(false);
            } catch (error) {
                console.error("Arkadaşlık istekleri alınırken hata:", error);
            }
        }
        fetchSentRequests();

    }, [searchUser]);

    useEffect(() => {
        async function loadSentRequestsFromStorage() {
            try {
                const savedSentRequests = await AsyncStorage.getItem("sentRequests");
                if (savedSentRequests) {
                    setSentRequests(JSON.parse(savedSentRequests));
                }
                setInitialLoading(false);
            } catch (error) {
                console.error("Gönderilen istekleri yükleme hatası:", error);
                setInitialLoading(false);
            }
        }

        const unsubscribe = navigation.addListener("beforeRemove", () => {
            saveSentRequestsToStorage();
        });

        loadSentRequestsFromStorage();

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        async function loadInitialData() {
            try {
                const currentUserId = await AsyncStorage.getItem("userId");
                const { data, error } = await supabase
                    .from("friendship_requests")
                    .select("*")
                    .eq("user_id", currentUserId)
                    .eq("status", "pending"); // Sadece pending olan istekleri al
                if (error) {
                    console.error("Arkadaşlık istekleri alınırken hata:", error);
                    return;
                }
                setSentRequests(data);
            } catch (error) {
                console.error("Arkadaşlık istekleri alınırken hata:", error);
            }
        }

        if (!initialLoading) {
            loadInitialData();
        }
    }, [initialLoading]);

    async function saveSentRequestsToStorage() {
        try {
            await AsyncStorage.setItem("sentRequests", JSON.stringify(sentRequests));
        } catch (error) {
            console.error("Gönderilen istekleri kaydetme hatası:", error);
        }
    }

    const handleFabPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSearchUser('');
        setSearchResults([]);
    };

    const handleSentRequistPress = () => {
        setSentRequist(!sentRequist);
    };

    const searchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .ilike("userName", `%${searchUser}%`);

            if (error) {
                console.error("Arama hatası:", error);
                return;
            }
            setSearchResults(data);
        } catch (error) {
            console.error("Arama hatası:", error);
        }
    };

    async function sendFriendRequest(currentUserId, selectedUserId) {
        try {
            setIsSendingRequest(true);

            if (sentRequests.some(request => request.friend_id === selectedUserId)) {
                console.log("Bu kullanıcıya zaten istek gönderilmiş.");
                setIsAlreadySent(true);
                setIsSendingRequest(false);
                return;
            }

            const { data, error } = await supabase
                .from("friendship_requests")
                .insert([
                    { user_id: currentUserId, friend_id: selectedUserId, status: "pending" },
                ]);

            if (error) {
                console.error("Arkadaşlık isteği gönderme hatası:", error);
                setIsSendingRequest(false); // İstek gönderme işlemi bitti
                return;
            }

            console.log("Arkadaşlık isteği başarıyla gönderildi:", data);
            setSentRequests([...sentRequests, { friend_id: selectedUserId, status: "pending" }]);
            setIsSendingRequest(false); // İstek gönderme işlemi bitti
        } catch (error) {
            console.error("Arkadaşlık isteği gönderme hatası:", error);
            setIsSendingRequest(false); // İstek gönderme işlemi bitti veya hata aldı
        }
    }

    const handleUserSelect = async (user) => {
        const currentUserId = await AsyncStorage.getItem("userId");
        const selectedUserId = user.userID;

        if (currentUserId === selectedUserId) {
            console.log("Kendinize istek gönderemezsiniz.");
            return;
        }

        if (isSendingRequest) {
            console.log("Bu kullanıcıya zaten istek gönderilmiş.");
            return;
        }

        if (sentRequests.some(request => request.friend_id === selectedUserId)) {
            console.log("Bu kullanıcıya zaten istek gönderilmiş.");
            setIsAlreadySent(true);
            return;
        }

        sendFriendRequest(currentUserId, selectedUserId);
        setSelectedFriends([...selectedFriends, user]);
        closeModal();
    };

    const renderUserItem = ({ item }) => {
        // Kullanıcının bu kişiye zaten istek gönderip göndermediğini kontrol ediyoruz
        const isAlreadySentToThisUser = sentRequests.some(
            request => request.friend_id === item.userID
        );

        return (
            <View>
                <View style={{ flexDirection: "row" }} >
                    <Image source={{ uri: item.profile_photo_url }} resizeMode="contain" style={styles.pp} />
                    <View style={styles.itemName}>
                        <Text>{item.userName}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addBox}
                        onPress={() => handleUserSelect(item)}
                        disabled={isAlreadySentToThisUser}
                    >
                        <Text style={styles.add}>
                            {isAlreadySentToThisUser ? "İstek Gönderildi" : "Arkadaş Ekle"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.seperator2} />
            </View>
        );
    };

    const renderSelectedFriends = () => {
        return selectedFriends.map(friend => (
            <FriendBox
                key={friend.userID}
                profilePhoto={friend.profile_photo_url}
                userName={friend.userName}
                fullName={friend.fullName}
            />
        ));
    };

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="height" >
                    <View style={{ flexDirection: "row", backgroundColor: "#8c8c8c", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={18} color={"black"} style={styles.icon} />
                            <TextInput style={{ fontSize: 13 }} placeholder={Translations[language].filterFriend} placeholderTextColor={"black"} value={null}
                                onChangeText={null} />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.status}>- Gelen İstekler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSentRequistPress} >
                        <Text style={styles.status}>- Gönderilen İstekler</Text>
                    </TouchableOpacity>
                    {sentRequist && renderSelectedFriends()}
                    <TouchableOpacity>
                        <Text style={styles.status}>- Arkadaşlar</Text>
                    </TouchableOpacity>

                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label={Translations[language].addFriend}
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

                                <View style={styles.searchUser} >
                                    <Icon name={"search"} size={16} color="black" style={styles.icon} />
                                    <TextInput
                                        value={searchUser}
                                        onChangeText={setSearchUser}
                                        placeholder={Translations[language].searchFriend}
                                        style={styles.searchText}
                                    />
                                </View>

                                <FlatList
                                    data={searchResults}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={renderUserItem}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </SafeAreaView>
        </SafeAreaProvider>
    )
};

export default Friends;
