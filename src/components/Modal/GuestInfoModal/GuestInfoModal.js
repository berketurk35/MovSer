import React from "react";
import { View, Text, Modal, TouchableOpacity} from "react-native";
import styles from "./GuestInfoModalStyles";

const GuestInfoModal = ({
    visible,
    closeModal,
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
                        <View style={styles.guestInfoBox} >
                            <Text style={styles.guestInfoTitle} >{Translations[language].hiUser}</Text>
                            <Text>{Translations[language].guestInfo1}</Text>
                            <TouchableOpacity onPress={onPress} style={styles.guestInfoButton}>
                                <Text style={styles.guestInfoButtonText}>{Translations[language].registerNow}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default GuestInfoModal;
