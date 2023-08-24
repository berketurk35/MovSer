import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, FlatList, Keyboard, ScrollView } from "react-native";
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
    const [guestVisible, setGuestVisible] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sentRequist, setSentRequist] = useState(false);
    const [incomingRequist, setIncomingRequist] = useState(false);
    const [friendsList, setFriendsList] = useState(true);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const [sentRequests, setSentRequests] = useState([]);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [isAlreadySent, setIsAlreadySent] = useState(false);

    const [receivedRequests, setReceivedRequests] = useState([]);

    const [searchFriend, setSearchFriend] = useState('');

    const [friends, setFriends] = useState([]);

    const { language, setLanguage } = useStats();


    useEffect(() => {
        if (searchUser) {
            searchUsers();
        }
    }, [searchUser]);

    useEffect(() => {
        fetchSentRequests();
        fetchInComingRequests();
        fetchFriends();
    }, []);

    const fetchSentRequests = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem("userId");
            const { data: sentRequestsData, error: sentRequestsError } = await supabase
                .from("friendship_requests")
                .select("*")
                .eq("user_id", currentUserId)
                .eq("status", "pending");

            if (sentRequestsError) {
                console.error("Arkadaşlık istekleri alınırken hata:", sentRequestsError);
                return;
            }

            const sentFriendIds = sentRequestsData.map(request => request.friend_id);

            const { data: sentFriendsData, error: sentFriendsError } = await supabase
                .from("users")
                .select("*")
                .in("userID", sentFriendIds);

            if (sentFriendsError) {
                console.error("Arkadaş detayları alınırken hata:", sentFriendsError);
                return;
            }

            setSelectedFriends(sentFriendsData);
        } catch (error) {
            console.error("Arkadaşlık istekleri ve detayları alınırken hata:", error);
        }
    };

    const fetchInComingRequests = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem("userId");

            // Gelen isteklerin bilgilerini çekin
            const { data: receivedRequestsData, error: receivedRequestsError } = await supabase
                .from("friendship_requests")
                .select("user_id, status")
                .eq("friend_id", currentUserId)
                .eq("status", "pending");

            if (receivedRequestsError) {
                console.error("Gelen istekler alınırken hata:", receivedRequestsError);
                return;
            }

            // Gelen isteklerin gönderen kullanıcıların user_id değerlerini bir diziye aktarın
            const receivedRequestUserIds = receivedRequestsData.map(request => request.user_id);

            // Gelen istekleri gönderen kullanıcıların bilgilerini çekerek state'i güncelleyin
            const { data: receivedRequestsUsersData, error: receivedRequestsUsersError } = await supabase
                .from("users")
                .select("*")
                .in("userID", receivedRequestUserIds);

            if (receivedRequestsUsersError) {
                console.error("Gelen isteklerin gönderen kullanıcı bilgileri alınırken hata:", receivedRequestsUsersError);
                return;
            }

            // State'i güncelleyin
            setReceivedRequests(receivedRequestsUsersData);
        } catch (error) {
            console.error("Gelen istekler ve gönderen kullanıcı bilgileri alınırken hata:", error);
        }
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


    const handleFabPress = async () => {
        const userId = await AsyncStorage.getItem("userId");
        if (userId === "guest") {
            setModalVisible(false);
            setGuestVisible(true);
        } else {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setGuestVisible(false);
        setSearchUser('');
        setSearchResults([]);
    };

    const handleSentRequistPress = () => {
        setSentRequist(!sentRequist);
    };

    const handleIncomingRequistPress = () => {
        setIncomingRequist(!incomingRequist);
    };

    const handleFriendPress = () => {
        setFriendsList(!friendsList);
    };

    const handleAcceptRequest = async (user) => {
        const currentUserId = await AsyncStorage.getItem("userId");
        const friendId = user.userID;

        // İstek durumunu "accepted" olarak güncelle
        try {
            const { data, error } = await supabase
                .from("friendship_requests")
                .update({ status: "accepted" })
                .eq("user_id", friendId)
                .eq("friend_id", currentUserId);

            if (error) {
                console.error("İstek kabul hatası:", error);
                return;
            }

            // Daha sonra friends tablosuna arkadaşlığı ekleyebilirsiniz
            const { data: friendsData, error: friendsError } = await supabase
                .from("friends")
                .insert([{ user_id: currentUserId, friend_id: friendId }, { user_id: friendId, friend_id: currentUserId }]);

            if (friendsError) {
                console.error("Friends tablosuna ekleme hatası:", friendsError);
                return;
            }

            // Durumu güncelle ve friends listesini yeniden çekin
            fetchSentRequests();
            fetchInComingRequests();
            fetchFriends();
        } catch (error) {
            console.error("İstek kabul ve friends ekleme hatası:", error);
        }
    };

    const handleRejectRequest = async (user) => {
        const currentUserId = await AsyncStorage.getItem("userId");
        const friendId = user.userID;

        // İstek durumunu "rejected" olarak güncelle
        try {
            const { data, error } = await supabase
                .from("friendship_requests")
                .update({ status: "rejected" })
                .eq("user_id", friendId)
                .eq("friend_id", currentUserId);

            if (error) {
                console.error("İstek reddetme hatası:", error);
                return;
            }

            // Durumu güncelle ve incoming requests listesini yeniden çekin
            fetchInComingRequests();
        } catch (error) {
            console.error("İstek reddetme hatası:", error);
        }
    };


    const searchUsers = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem("userId");
            const { data: acceptedRequestsData, error: acceptedRequestsError } = await supabase
                .from('friendship_requests')
                .select('friend_id')
                .eq('user_id', currentUserId)
                .eq('status', 'accepted');

            if (acceptedRequestsError) {
                console.error('Onaylanmış istekler alınırken hata:', acceptedRequestsError);
                return;
            }

            const friendIds = acceptedRequestsData.map(request => request.friend_id);

            const { data, error } = await supabase
                .from("users")
                .select("*")
                .not('userID', 'eq', currentUserId)
                .not('userID', 'eq', friendIds)
                .ilike("userName", `%${searchUser}%`);

            if (error) {
                console.error("Arama hatası:", error);
                return;
            }

            // Kullanıcıların istek durumunu kontrol etmek için friendship_requests tablosundan istekleri çekin
            const { data: sentRequestsData, error: sentRequestsError } = await supabase
                .from("friendship_requests")
                .select("friend_id, status")
                .eq("user_id", currentUserId)
                .eq("status", "pending");

            if (sentRequestsError) {
                console.error("İstekler alınırken hata:", sentRequestsError);
                return;
            }

            // İstek gönderilen kullanıcıların friend_id değerlerini bir diziye aktarın
            const sentRequestFriendIds = sentRequestsData.map(request => request.friend_id);

            // Kullanıcılar listesini döngüye alarak her bir kullanıcının istek durumunu kontrol edin
            const updatedSearchResults = data.map(user => ({
                ...user,
                isAlreadySent: sentRequestFriendIds.includes(user.userID),
                isFriend: friendIds.includes(user.userID)
            }));
            const nonFriendResults = updatedSearchResults.filter(user => !user.isFriend);

            setSearchResults(nonFriendResults);
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
        Keyboard.dismiss();
        const currentUserId = await AsyncStorage.getItem("userId");
        const selectedUserId = user.userID;

        sendFriendRequest(currentUserId, selectedUserId);
        setSelectedFriends([...selectedFriends, user]);
        closeModal();
    };

    const renderUserItem = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: "row" }} >
                    <Image source={{ uri: item.profile_photo_url }} resizeMode="contain" style={styles.pp} />
                    <View style={styles.itemName}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <Text style={styles.fullName} >{item.fullName}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addBox}
                        onPress={() => handleUserSelect(item)}
                        disabled={item.isAlreadySent}
                    >
                        <Text style={styles.add}>
                            {item.isAlreadySent ? Translations[language].requestSent : Translations[language].addFriend}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.seperator2} />
            </View>
        );
    };

    const renderReceivedRequests = () => {
        return receivedRequests.filter(
            (requestSender) =>
                requestSender.userName.toLowerCase().includes(searchFriend.toLowerCase())
        ).map(requestSender => (
            <FriendBox
                key={requestSender.userID}
                profilePhoto={requestSender.profile_photo_url}
                userName={requestSender.userName}
                fullName={requestSender.fullName}
                pressAccept={() => handleAcceptRequest(requestSender)}
                pressReject={() => handleRejectRequest(requestSender)}
                iconName1={"like1"}
                iconName2={"dislike1"}
            />
        ));
    };

    const renderSentRequest = () => {
        return selectedFriends.filter(
            (friend) =>
                friend.userName.toLowerCase().includes(searchFriend.toLowerCase())
        ).map(friend => (
            <FriendBox
                key={friend.userID}
                profilePhoto={friend.profile_photo_url}
                userName={friend.userName}
                fullName={friend.fullName}
            />
        ));
    };

    const renderFriends = () => {
        return friends.filter(
            (friend) =>
                friend.userName.toLowerCase().includes(searchFriend.toLowerCase())
        ).map(friend => (
            <FriendBox
                key={friend.userID}
                profilePhoto={friend.profile_photo_url}
                userName={friend.userName}
                fullName={friend.fullName}
            />
        ));
    };

    function goToRegisterPage() {
        navigation.navigate("Register");
    }

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="height" >
                    <View style={{ flexDirection: "row", backgroundColor: "white", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={18} color={"black"} style={styles.icon} />
                            <TextInput style={{ fontSize: 13, flex: 1 }} placeholder={Translations[language].filterFriend} placeholderTextColor={"black"} value={searchFriend}
                                onChangeText={setSearchFriend} />
                        </View>
                    </View>
                    <ScrollView>
                        <TouchableOpacity onPress={handleIncomingRequistPress}>
                            <Text style={styles.status}>- {Translations[language].incomingRequest} ({receivedRequests.length})</Text>
                        </TouchableOpacity>
                        {incomingRequist && renderReceivedRequests()}
                        <TouchableOpacity onPress={handleSentRequistPress} >
                            <Text style={styles.status}>- {Translations[language].submittedRequest} ({selectedFriends.length}) </Text>
                        </TouchableOpacity>
                        {sentRequist && renderSentRequest()}
                        <TouchableOpacity onPress={handleFriendPress}>
                            <Text style={styles.status}>- {Translations[language].profileTitle2} ({friends.length})</Text>
                        </TouchableOpacity>
                        {friendsList && renderFriends()}
                    </ScrollView>


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
                                    <Text>{Translations[language].guestInfo2}</Text>
                                    <TouchableOpacity onPress={goToRegisterPage} style={styles.guestInfoButton}>
                                        <Text style={styles.guestInfoButtonText}>{Translations[language].registerNow}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </SafeAreaView>
        </SafeAreaProvider>
    )
};

export default Friends;
