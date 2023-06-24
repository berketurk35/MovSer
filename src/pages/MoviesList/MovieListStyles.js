import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    content: {
        flex: 1,
        position: "relative",
    },
    title: {
        color: "white",
        textAlign: "center",
    },
    fab: {
        position: "absolute",
        margin: 12,
        right: 0,
        bottom: 0,
        backgroundColor: "#FFB6C1",
        elevation: 24,
        shadowColor: "black",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        margin: 20,

    },
    modalContent: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
    },
    button: {
        backgroundColor: "#1565C0",
        borderRadius: 14,
        marginTop: 20,
        marginHorizontal: Dimensions.get("screen").width / 5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        padding: 10,
    },
    savedMoviesContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    savedMovieText: {
        fontSize: 16,
        marginBottom: 8,
        color: "white",
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FF95AB",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 40,
        borderRadius: 16,
        borderWidth: 0.6,
        elevation: 24,
        shadowColor: "black",
        opacity: 1,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    seperator: {
        height: 1,
        backgroundColor: "black",
    }
});
