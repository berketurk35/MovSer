import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, FlatList, Image } from "react-native";
import Input from "../../Input/Input";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CustomMovieModalStyles";

const CustomMovieModal = ({
    visible,
    closeModal,
    searchText,
    setSearchText,
    searchResults,
    setSelectedMovie,
    selectedMovie,
    handleTextChange,
    handleSearchBarPress,
    handleMovieSelect,
    saveMovie,
    Translations,
    language,
    formatDate,
    categoryText,
    IMAGE_BASE_URL
}) => {

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

    return (
        <Modal
            visible={visible}
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
    );
};

export default CustomMovieModal;
