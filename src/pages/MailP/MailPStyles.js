import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    box: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 16,
        width: Dimensions.get("window").width / 1.4,
        margin: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    input: {
        flex: 1,
    },
    icon: {
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: "#1565C0",
        width: Dimensions.get("window").width / 1.6,
        borderRadius: 14,
        marginTop: 20,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        padding: 10,
    },
    underText: {
        marginTop: 15,
        flexDirection: "row"
    },
})