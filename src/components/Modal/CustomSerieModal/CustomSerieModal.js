import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, FlatList, Image } from "react-native";
import Input from "../../Input/Input";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CustomSerieModalStyles";

const CustomSerieModal = ({
    modalVisible,
    closeModal,
    searchText,
    setSearchText,
    searchResults,
    setSelectedSerie,
    selectedSerie,
    handleTextChange,
    handleSearchBarPress,
    handleSerieSelect,
    saveSerie,
    Translations,
    language,
    formatDate,
    categoryText,
    seasons,
    episodes,
    IMAGE_BASE_URL
}) => {

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

    return (
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
    );
};

export default CustomSerieModal;
