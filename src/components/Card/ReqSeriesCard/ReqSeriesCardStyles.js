import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    card: {
        backgroundColor: colors.cardBody,
        alignSelf: "center",
        borderBottomWidth: 2,
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
        color: "white",
        padding: 4,
    },
    textDate: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.secondary,
        padding: 4,
    },
    textSeasons: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.seasons,
        padding: 4,
    },
    textCategory: {
        fontSize: 11,
        fontWeight: "bold",
        color: colors.textCategory,
        padding: 4,
    },
    textVote: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.textVote,
        padding: 4,
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
        paddingLeft: 4,
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
    instaDate: {
        textAlign: "center",
        color: "gray",
        fontSize: 12,
    }
});