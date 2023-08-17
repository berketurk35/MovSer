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
        marginVertical: 15,
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
    },
    box: {
        borderWidth: 1,
        borderRadius: 16,
        flexDirection: "row",
        margin: 10,
        width: Dimensions.get("window").width / 2,
        backgroundColor: "#f5fcff"
    },
    icon: {
        padding: 10,
        paddingLeft: 15,
    },
    text: {
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: 10,
        color: "black"
    },
    text2: {
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: 8,
        color: "black"
    },
    seperator: {
        height: 40 ,
        borderWidth: 0.5,
    }
})