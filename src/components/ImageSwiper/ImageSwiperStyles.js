import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        height: 150,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    miniImg: {
        height: 35,
        width: 70,
        margin: 5,
    },
    image: {
        flex: 1,
    },
    bodyRow: {
        flexDirection: "row",
        alignSelf: "center"
    },
    text: {
        fontSize: 14,
        color: "black",
        padding: 10,
        backgroundColor: "#F0E1CD",
        marginVertical: 6,
    },
    seperator: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginVertical: 6,
    },
    imageBack: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 4,
        fontWeight: 'bold',
    },
    searchMovie: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 8,
    },
    searchText: {
        flex: 1,
        paddingLeft: 14,
        fontSize: 14,
    },
    cardName: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    preview: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 10,
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
});
