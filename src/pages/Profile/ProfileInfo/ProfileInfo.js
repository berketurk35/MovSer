import React, { useState, useEffect, forwardRef } from "react";
import { useStats } from "../../../Context/StatContext";
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import Translations from "../../../languages/Translation";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from 'react-native-toast-message';

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

import styles from "./ProfileInfoStyles";

GoogleSignin.configure({
    androidClientId: '214952846412-hl3vdaqtc3eqgnp4jo7637688qkt9rpf.apps.googleusercontent.com',
    webClientId: '214952846412-t8qkpquhomi9oef31it3grabm65uhdd5.apps.googleusercontent.com',
});

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

function ProfileInfo({ navigation }) {

    const [currentUserGuest, setCurrentUserGuest] = useState(false);
    const [userProfilePhoto, setUserProfilePhoto] = useState("https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg");
    const [userName, setUserName] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userNameEdit, setUserNameEdit] = useState("");
    const [userFullNameEdit, setUserFullNameEdit] = useState("");
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [err, setEr] = useState("");

    const { movieCounter, reqMovieCounter, serieCounter, activeSerieCounter, reqSerieCounter, movieListCounter, serieListCounter, language, setLanguage } = useStats();

    useEffect(() => {
        whichUser();
    }, []);

    const toastConfig = {
        test: internalState => (
            <View style={{ height: 40, width: '90%', backgroundColor: "gray" }} >
                <Text style={{ color: "white" }} >{internalState.text1} </Text>
            </View>
        )
    }

    const ForwardedToast = forwardRef((props, ref) => {
        return <Toast config={toastConfig} ref={ref} {...props} />;
    });

    const showToastMessage = () => {
        Toast.show({
            type: 'error',
            text1: 'Fotoğraf ekleme güncelleme ile gelecektir.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 0
        });
    };

    const changeLanguage = async () => {
        const newLanguage = language === "en" ? "tr" : "en";

        try {
            await AsyncStorage.setItem("language", newLanguage);
            setLanguage(newLanguage);
            console.log('Veri güncellendi.');
        } catch (error) {
            console.error('Veri güncellenirken hata oluştu:', error);
        }
    };

    const whichUser = async () => {
        const user = await AsyncStorage.getItem("userId");
        if (user === "guest") {
            setCurrentUserGuest(true);
        } else {
            setCurrentUserGuest(false);
        }

        const currentUserId = await AsyncStorage.getItem("userId");
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('userID', currentUserId);

        if (error) {
            console.error('Sorgu hatası:', error);
            return;
        }

        if (data && data.length > 0) {
            const userData = data[0];
            setUserProfilePhoto(userData.profile_photo_url);
            setUserName(userData.userName);
            setUserFullName(userData.fullName);
        } else {
            console.log('Kullanıcı bulunamadı.');
        }
    };

    const editUserInfo = async () => {

        if (!userNameEdit || !userFullNameEdit) {
            setEr("Lütfen tüm bilgileri eksiksiz girin.");
            return;
        }

        if (userNameEdit.length < 4 || userNameEdit.length > 18) {
            setEr("Kullanıcı adı 4 ila 18 karakter arasında olmalıdır.");
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(userNameEdit)) {
            setEr("Kullanıcı adı sadece harf ve rakam içermelidir.");
            return;
        }

        if (userFullNameEdit.length < 3 || userFullNameEdit.length > 26) {
            setEr("Ad ve soyad 3 ila 26 karakter arasında olmalıdır.");
            return;
        }


        const currentUserId = await AsyncStorage.getItem("userId");

        const { data, error } = await supabase
            .from("users")
            .update({
                userName: userNameEdit,
                fullName: userFullNameEdit
            })
            .eq("userID", currentUserId);

        if (error) {
            console.error("Veri güncellenirken hata:", error);
            return;
        }

        closeModal();
        console.log("Veri başarıyla güncellendi.");

    };

    const logOut = async () => {
        await AsyncStorage.setItem('rememberMe', 'false');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        await GoogleSignin.signOut();
        RNRestart.Restart();
        console.log("Çıkış Yapıldı.");
    };

    const handlePressEditModal = () => {
        setEditProfileModal(true);
    }

    const closeModal = () => {
        setEditProfileModal(false);
        setUserFullNameEdit("");
        setUserNameEdit("");
        setEr("");
    };

    const logOutGuest = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container} >
            {currentUserGuest ? (
                <View style={styles.row}>
                    <Image source={{ uri: "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg" }} resizeMode="stretch" style={styles.image} />
                    <View style={{ flex: 2 }} >
                        <Text style={styles.userName} >@GuestUser</Text>
                        <View style={styles.seperator} />
                        <Text style={styles.fullName}> {Translations[language].guest} </Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity style={styles.editBox}>
                                <Text style={styles.editTitle} >{Translations[language].editprofile}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={logOutGuest} style={styles.logoutBox}>
                                <Text style={styles.editTitle} >{Translations[language].logOut}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={changeLanguage} style={styles.languageBox}>
                        {language === "en" ? (
                            <Image source={require("../../../images/eng.png")} style={styles.langImg} />
                        ) : (
                            <Image source={require("../../../images/tr.png")} style={styles.langImg} />
                        )
                        }
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.row}>
                    <Image source={{ uri: userProfilePhoto }} resizeMode="stretch" style={styles.image} />
                    <View style={{ flex: 2 }} >
                        <Text style={styles.userName} >@{userName}</Text>
                        <View style={styles.seperator} />
                        <Text style={styles.fullName}> {userFullName} </Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={handlePressEditModal} style={styles.editBox}>
                                <Text style={styles.editTitle} >{Translations[language].editprofile}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={logOut} style={styles.logoutBox}>
                                <Text style={styles.editTitle} >{Translations[language].logOut}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={changeLanguage} style={styles.languageBox}>
                        {language === "en" ? (
                            <Image source={require("../../../images/eng.png")} style={styles.langImg} />
                        ) : (
                            <Image source={require("../../../images/tr.png")} style={styles.langImg} />
                        )
                        }
                    </TouchableOpacity>
                </View>
            )
            }
            <View style={styles.seperator2} />
            <View style={styles.body} >
                <Text style={styles.title}>{Translations[language].stats}</Text>

                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].moviesTitle1} : {movieCounter} </Text>
                    <Text style={styles.text}>{Translations[language].moviesTitle2} : {reqMovieCounter}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>{Translations[language].seriesTitle1} : {serieCounter}</Text>
                    <Text style={styles.text}>{Translations[language].seriesTitle2} : {activeSerieCounter}</Text>
                    <Text style={styles.text}>{Translations[language].seriesTitle3} : {reqSerieCounter}</Text>
                </View>
                <View style={styles.box2}>
                    <Text style={styles.text}>{Translations[language].listTitle1} : {movieListCounter}</Text>
                    <Text style={styles.text}>{Translations[language].listTitle2} : {serieListCounter}</Text>
                </View>
            </View>

            <Modal
                visible={editProfileModal}
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
                                <Image source={{ uri: userProfilePhoto }} resizeMode="contain" style={styles.editPhoto} />
                                <ForwardedToast />
                                <TouchableOpacity onPress={showToastMessage} style={styles.editIcon}>
                                    <Icon name={"camera-alt"} size={22} color={"black"} />
                                </TouchableOpacity>
                                <View style={styles.editBody} >
                                    <Text style={styles.editBodyTitle}>UserName : </Text>
                                    <TextInput style={styles.editBodyInput} placeholder={userName} value={userNameEdit} onChangeText={setUserNameEdit} autoCapitalize="none" />
                                </View>
                                <View style={styles.editBody} >
                                    <Text style={styles.editBodyTitle}>FullName : </Text>
                                    <TextInput style={styles.editBodyInput} placeholder={userFullName} value={userFullNameEdit} onChangeText={setUserFullNameEdit} />
                                </View>
                                {err.length > 0 &&
                                    <Text style={styles.errorMessage} > {err} </Text>
                                }
                                <TouchableOpacity onPress={editUserInfo} style={styles.editButton}>
                                    <Text style={styles.editButtonText}>Bilgileri Güncelle</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
};

export default ProfileInfo;
