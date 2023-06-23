import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, SafeAreaView, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./MovieListStyles";

import MovSerCard from "../../components/MovSerCard/MovSerCard";
import Input from "../../components/Input/Input";
import PickerCategory from "../../components/PickerCategory/PickerCategory";
import PickerPlatform from "../../components/PickerPlatform/PickerPlatform";

import { FAB } from "react-native-paper";

function MoviesList({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');

    const handleFabPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleModalPress = () => {
        
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../images/3.jpeg")} style={styles.background}>
                <View style={styles.content}>
                    <Text style={styles.title} >
                        Movies
                    </Text>
                    <MovSerCard />
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        onPress={handleFabPress}
                    />

                </View>
            </ImageBackground>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalBackground}
                    activeOpacity={1}
                    onPress={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Input label={"Film Adı"} icon={"pricetags"} placeholder={"Örn. Harry Potter"} />
                            <View style={{ flexDirection: "row" }} >
                                <View style={{ flex: 1, marginRight: 10 }} >
                                    <PickerCategory selectedValue={selectedCategory} onValueChange={(itemValue) => setSelectedCategory(itemValue)} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PickerPlatform selectedValue={selectedPlatform} onValueChange={(itemValue) => setSelectedPlatform(itemValue)} />
                                </View>
                            </View>
                            <Input label={"Not"} icon={"chatbox"} placeholder={"Film ile ilgili not ekleyebilirsiniz.."} />
                            <TouchableOpacity style={styles.button} onPress={null} >
                                <Text style={styles.buttonText} >Filmi Kaydet</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>


    )
};

export default MoviesList;
