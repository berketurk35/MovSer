import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    card: {
        backgroundColor: "white",
        opacity: 0.8,
        alignSelf: "center",
        borderRadius: 20,
        height: Dimensions.get("window").height / 6,
        width: Dimensions.get("window").width / 1.2,
        borderWidth: 0.5,

    },
    textMovie: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        padding: 8,
    },
    textPlatform: {
        flex: 2,
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        padding: 4,
    },
    textCategory: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        padding: 4,
    },
    text: {
        flex: 1,
        padding: 4,
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    topCard: {
        flexDirection: "row",
    },
    verticalSeperator: {
        width: 1,
        backgroundColor: "black",
    },
    horizontalSeperator: {
        height: 1,
        backgroundColor: "black",
    },
});