import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d8d8d8"
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
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
    },
    modalContent: {
        backgroundColor: "#e5e5e5",
        padding: 16,
        borderRadius: 16,
    },
    editPhoto: {
        alignSelf: "center",
        height: Dimensions.get("window").height / 6,
        width: Dimensions.get("window").width / 3,
        borderRadius: 100,
        marginBottom: 10,
    },
    editBody: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 20,
    },
    editBodyTitle: {
        flex: 1,
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    editBodyInput: {
        flex: 2,
        borderWidth: 0.5,
        borderRadius: 16,
        paddingHorizontal: 15,
    },
    editIcon: {
        position: "absolute",
        top: Dimensions.get("window").height / 7,
        right: Dimensions.get("window").width / 4,
    },
    editButton: {
        backgroundColor: "#1565C0",
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "white",
        marginTop: 20,
        alignSelf: "center",
        paddingHorizontal: 20
    },
    editButtonText: {
        color: "white",
        padding: 14,
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        alignSelf: "center",
        paddingTop: 10,
    }
});