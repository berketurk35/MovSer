import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5",
    },
    content: {
        flex: 1,
        position: "relative",
    },
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
        padding: 16,
        borderRadius: 16,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    cardName: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 8,
        fontWeight: 'bold',
    }
});
