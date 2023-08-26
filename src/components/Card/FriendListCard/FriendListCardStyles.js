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
        paddingLeft: 6,
        paddingTop: 2,
        fontSize: 12,
        color: "black",
        fontWeight: "bold",
        backgroundColor: "#e2e5dc",
        textAlign: "center",
        flex: 1,
        opacity: 0.8,
    },
    cardMessageTitle: {
        paddingLeft: 6,
        paddingTop: 6,
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "#e2e5dc",
        textAlign: "center",
        opacity: 0.8,
    },
    card: {
        width: Dimensions.get("screen").width / 2,
        //height: 149,
        height: Dimensions.get("screen").height / 5.8,
        borderRadius: 12,
        overflow: "hidden",
    },
    cardInfo: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
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