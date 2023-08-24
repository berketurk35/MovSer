import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 160,
        width: 200,
        padding: 10,
        margin: 10,
        borderWidth: 0.5,
        borderColor: "white",
        backgroundColor: "black",
        borderRadius: 12,
        elevation: 10,
        shadowColor: "black",
    },
    cardName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 12,
        textAlign: "center"
    },
    cardMessage: {
        paddingLeft: 4,
        fontSize: 12,
    },
    cardMessageTitle: {
        paddingLeft: 4,
        color: "black",
        fontSize: 12,
    },
    card: {
        width: Dimensions.get("screen").width / 2,
        height: 149,
        borderRadius: 12,
        backgroundColor: "#e2e5dc",
        justifyContent: "center"
    },
    cardInfo: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    infoBox: {
        width: Dimensions.get("screen").width / 2.4,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 4,
        marginTop: 6,
    },
});