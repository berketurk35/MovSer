import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    card: {
        backgroundColor: "white",
        opacity: 0.8,
        alignSelf: "center",
        borderRadius: 20,
        height: Dimensions.get("window").height / 6.7,
        width: Dimensions.get("window").width / 1.3,
        marginVertical: 15,
        elevation: 22,
        shadowColor: "yellow"

    },
    textMovie: {
        //flex: 1,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        padding: 6,
    },
    textTop: {
        flex: 1,
        fontSize: 12,
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        padding: 4,
    },
    text: {
        flex: 1,
        paddingTop: 4,
        paddingLeft: 12,
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
    },
    topCard: {
        flexDirection: "row",
    },
    verticalSeperator: {
        width: 0.6,
        backgroundColor: "black",
    },
    horizontalSeperator: {
        height: 0.6,
        backgroundColor: "black",
    },
});