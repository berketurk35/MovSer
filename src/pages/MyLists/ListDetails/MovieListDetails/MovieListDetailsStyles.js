import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
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
        borderWidth: 1,
        borderColor: "white",
        opacity: 0.8
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
    buttonText2: {
        textAlign: "center",
        fontSize: 14,
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
        marginHorizontal: 10,
        marginVertical: 10,
        height: 38,
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
    customHeader: {
        backgroundColor: "white",
        height: Dimensions.get("window").height / 14,
        flexDirection: "row",
        alignItems: "center",
    },
    headerTextContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        paddingLeft: 12,
    },
    card: {
        backgroundColor: "#212121",
        alignSelf: "center",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "gray",
        height: Dimensions.get("window").height / 5,
        width: Dimensions.get("window").width / 1,
    },
    topCard: {
        flexDirection: "row",
    },
    textMovie: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ececec",
        padding: 6,
    },
    textDate: {
        fontSize: 12,
        fontWeight: "bold",
        color: "yellow",
        padding: 6,
    },
    textCategory: {
        fontSize: 12,
        fontWeight: "bold",
        color: "cyan",
        padding: 6,
    },
    textVote: {
        fontSize: 12,
        fontWeight: "bold",
        color: "green",
        padding: 6,
    },
    poster: {
        flex: 0.8,
    },
    image: {
        height: Dimensions.get("window").height / 5.5,
        margin: 6,
        borderWidth: 4,
        borderColor: "black"
    },
    rightCard: {
        flex: 2,
        justifyContent: "center",
    },
    iconx: {
        alignSelf: "center",
        paddingLeft: 6,
    },
    icon2: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 10,
        marginRight: 14,
    },
    movieNameCard: {
        backgroundColor: "#1f1f1f",
        elevation: 50,
        marginRight: 6,
    },
    info: {
        textAlign: "center",
        color: "white",
        fontSize: 12,
        paddingBottom: 5,
    },
    shareBox: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: "green"
    },
    shareText: {
        fontSize: 10,
        color: "green",
        fontWeight: "bold",
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
        padding: 10,
        borderRadius: 16,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    friendList: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    guestInfoBox: {
        alignItems: "center",
    },
    guestInfoTitle: {
        fontSize: 16,
        paddingBottom: 10,
        color: "black"
    },
    guestInfoButton: {
        backgroundColor: "#1565C0",
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "white",
        marginTop: 20,
    },
    guestInfoButtonText: {
        color: "white",
        padding: 14,
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 22,
        padding: 10,
        fontSize: 14,
        textAlignVertical: 'top',
    },
});
