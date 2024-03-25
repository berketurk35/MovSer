import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        position: "relative",
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
        borderRadius: 12,
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
        backgroundColor: colors.secondary,
        marginVertical: 6,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    imageBack: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 14,
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
        fontSize: 15,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    preview: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        paddingBottom: 10,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        marginTop: 20,
        marginHorizontal: Dimensions.get("screen").width / 5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        padding: 10,
    },
    info: {
        textAlign : "center",
        fontSize: 12,
    }
});
