import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import FriendBox from "../../../components/FriendBox/FriendBox";

import styles from "./FriendsStyles";

import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

function Friends({navigation}) {

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="height" >
                    <View style={{ flexDirection: "row", backgroundColor: "#8c8c8c", opacity: 0.7 }} >
                        <View style={styles.search} >
                            <Icon name="search" size={18} color={"black"} style={styles.icon} />
                            <TextInput style={{ fontSize: 13 }} placeholder="Search" placeholderTextColor={"black"} value={null}
                                onChangeText={null} />
                        </View>
                    </View>
                    
                    <FriendBox/>
                    <FriendBox/>
                    <FriendBox/>

                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label="Add Friend"
                        color="white"
                        onPress={null}
                    />

                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
};

export default Friends;