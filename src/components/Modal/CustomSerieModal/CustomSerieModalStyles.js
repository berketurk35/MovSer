import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
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
    button: {
        backgroundColor: "#1565C0",
        borderRadius: 14,
        marginTop: 20,
        marginHorizontal: Dimensions.get("screen").width / 5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        padding: 10,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 20,
    },
    searchMovie: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 22,
    },
    searchText: {
        flex: 1,
        fontSize: 14,
    },
});
