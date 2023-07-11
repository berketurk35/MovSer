import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body: {
        marginTop: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        color: "black"
    },
    label: {
        fontSize: 14,
        color: "gray",
        fontWeight: "bold",
        marginBottom: 6,
    },
    box: {
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 0.1,
        paddingHorizontal: 15,
        height: 50,
        elevation: 24,
        shadowColor: "blue",
    },
});
