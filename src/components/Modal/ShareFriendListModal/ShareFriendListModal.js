import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, FlatList, Image } from "react-native";
import FriendBoxShare from "../../FriendBoxShare/FriendBoxShare";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./ShareFriendListModalStyles";

const ShareFriendListModal = ({
    visible,
    closeShareModal,
    searchFriend,
    setSearchFriend,
    Translations,
    language,
    friends,
}) => {
    useEffect(() => {
        // Her searchFriend state'i güncellendiğinde bu etki çalışır
        console.log("searchFriend güncellendi:", searchFriend);
    }, [searchFriend]);

    return (
        <Modal
            visible={visible}
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
                                    onChangeText={(text) => setSearchFriend(text)} />
                            </View>
                        </View>
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
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default ShareFriendListModal;
