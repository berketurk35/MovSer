import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#979797"
    },
    image: {
        flex: 1,
        height: Dimensions.get("window").height / 6,
        borderRadius: 200,
        borderWidth: 2,
        borderColor: "black",
        margin: 20,
    },
    seperator: {
        borderWidth: 1,
        width: Dimensions.get("window").width / 2,
    },
    userName: {
        fontSize: 22,
        paddingBottom: 10,
        color: "black",
        fontWeight: "bold",
    },
    fullName: {
        fontSize: 18,
        paddingTop: 10,
        color: "black",
    },
    body: {
        margin: 20,
    },
    text: {
        fontSize: 15,
        padding: 4,
        //color: "black",
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    seperator2: {
        borderWidth: 0.3,
        width: Dimensions.get("window").width,
    },
    fBox: {
        padding: 10,
    },
    box: {
        padding: 10,
        borderTopWidth: 1,
    },
});