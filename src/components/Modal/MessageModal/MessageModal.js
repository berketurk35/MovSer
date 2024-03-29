import React from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import styles from "./MessageModalStyles";

const MessageModal = ({
    visible,
    closeModal,
    value,
    onChangeText,
    onPress,
    Translations,
    language,
}) => {

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
                            <View>
                                <Text style={styles.friendList} > {Translations[language].writeMessage}</Text>
                                <View style={styles.seperator2} />
                                <TextInput
                                    style={styles.input}
                                    multiline
                                    numberOfLines={4}
                                    maxLength={160}
                                    value={value}
                                    onChangeText={onChangeText}
                                    placeholder={Translations[language].writeYourMessage}
                                />
                                <TouchableOpacity onPress={onPress} style={styles.button}>
                                    <Text style={styles.buttonText} >{Translations[language].shareList}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default MessageModal;
