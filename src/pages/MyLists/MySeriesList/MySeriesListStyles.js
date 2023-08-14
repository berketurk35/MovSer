import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        position: "relative",
    },
    fab: {
        position: "absolute",
        margin: 12,
        right: 0,
        bottom: 0,
        backgroundColor: "#1565C0",
        borderWidth: 1,
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
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white", //#FF95AB
        marginLeft: 30,
        marginVertical: 10,
        height: 38,
        borderRadius: 16,
        borderWidth: 0.6,
        elevation: 24,
        shadowColor: "black",
        opacity: 1,
    },
    removeBox: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
    },
    removeText: {
        fontSize: 10,
        padding: 2,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    seperator: {
        height: 1,
        backgroundColor: "black",
    },
    
    body: {
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
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    seperator: {
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
    info: {
        textAlign : "center",
        fontSize: 12,
    }
});
