import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5"
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
        backgroundColor: "#1565C0",
        borderWidth: 2,
        borderColor: "black",
        opacity: 0.8
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
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
        backgroundColor: "white", //#FF95AB
        marginHorizontal: 30,
        marginVertical: 10,
        height: 38,
        borderRadius: 16,
        borderWidth: 0.6,
        elevation: 44,
        shadowColor: "black",
        opacity: 1,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 20,
    },
    bottomText: {
        textAlign: "center",
        paddingTop: 6,
    },
    searchMovie: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 22,
    },
    searchText: {
        flex: 1,
        fontSize: 14,
    },
});
