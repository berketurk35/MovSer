import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
    },
    guestInfoBox: {
        alignItems: "center",
    },
    guestInfoTitle: {
        fontSize: 16,
        paddingBottom: 10,
        color: "black"
    },
    guestInfoButton: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "white",
        marginTop: 20,
    },
    guestInfoButtonText: {
        color: "white",
        padding: 14,
    },
});
