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
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black",
        margin: 20,
    },
    seperator: {
        height: 2,
        backgroundColor: "black",
        width: Dimensions.get("window").width / 2.,
    },
    userName: {
        fontSize: 18,
        paddingBottom: 10,
        color: "black",
        fontWeight: "bold",
    },
    fullName: {
        fontSize: 16,
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
        borderBottomWidth: 1,
    },
    box2: {
        padding: 10,
    },
    langImg: {
        height: 25,
        width: 25,
    },
    languageText: {
        paddingBottom: 6,
        fontSize: 12,
        color: "black",
    },
    languageBox: {
        position: "absolute",
        top: 15,
        right: 20,
        alignItems: "center"
    },
    editBox: {
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "black",
        marginTop: 10,
        marginRight: 10,
    },
    logoutBox: {
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "black",
        marginTop: 10,
        marginRight: 35,
    },
    editTitle: {
        paddingVertical: 6,
        color: "black",
        fontSize: 10,
        textAlign: "center",
    },
    removeDataBox: {
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: "#1565C0",
        alignSelf: "center",
        width: Dimensions.get("window").width / 3,
        marginTop: 20,
    },
    removeDataText: {
        padding: 10,
        textAlign: "center",
        color: "white",
    }
});