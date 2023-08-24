import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    card: {
        backgroundColor: "#212121",
        alignSelf: "center",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "gray",
        height: Dimensions.get("window").height / 5,
        width: Dimensions.get("window").width / 1,
    },
    topCard: {
        flexDirection: "row",
    },
    textMovie: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ececec",
        padding: 6,
    },
    textDate: {
        fontSize: 12,
        fontWeight: "bold",
        color: "yellow",
        padding: 6,
    },
    textCategory: {
        fontSize: 12,
        fontWeight: "bold",
        color: "cyan",
        padding: 6,
    },
    textVote: {
        fontSize: 12,
        fontWeight: "bold",
        color: "green",
        padding: 6,
    },
    poster: {
        flex: 0.8,
    },
    image: {
        height: Dimensions.get("window").height / 5.5,
        margin: 6,
        borderWidth: 4,
        borderColor: "black"
    },
    rightCard: {
        flex: 2,
        justifyContent: "center",
    },
    icon: {
        alignSelf: "center",
        paddingLeft: 6,
    },
    icon2: {
        position: "absolute",
        top: 0,
        right: 25,
        marginTop: 10,
        marginRight: 14,
    },
    icon3: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 10,
        marginRight: 14,
    },
    movieNameCard: {
        elevation: 50,
        marginRight: 6,
    },
    instaDate: {
        textAlign: "center",
        color: "gray"
    }
});