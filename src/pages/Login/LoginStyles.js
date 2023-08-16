import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    logo: {
        height: Dimensions.get("window").height / 6,
        width: Dimensions.get("window").width / 3,
        marginBottom: 40,
    },
    flagImage: {
        height: 50,
        width: 50,
    },
    underText: {
        marginTop: 15,
        flexDirection: "row"
    },
    languageBox: {
        position: "absolute",
        top: 20,
        right: 20,
        alignItems: "center"
    },
    langImg: {
        height: 30,
        width: 30,
    },
    languageText: {
        paddingBottom: 6,
        fontSize: 12,
    }
})