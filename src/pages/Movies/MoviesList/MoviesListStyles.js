import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5",
    },
    filterContainer: {
        flexDirection: "row",
        backgroundColor: colors.primary,
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginHorizontal: 30,
        marginVertical: 10,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
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
        flexDirection: "row",
        padding: 10,
        position: "absolute",
        margin: 12,
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "black",
        opacity: 0.9,
    },
    fabColor: {
        color: "white",
        fontWeight: "bold",
        margin: 4,
        textAlign: "center",
    },
    fabIcon: {
        margin: 2,
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
    flatlistBox: {
        height: Dimensions.get("window").height / 2.5,
    }
});
