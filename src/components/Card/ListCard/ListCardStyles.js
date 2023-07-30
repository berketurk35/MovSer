import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: Dimensions.get("window").width / 12,
        height: Dimensions.get("screen").height / 4,
    },
    cardName: {
        flex: 1,
        color: "black",
        padding: 6,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    image: {
        alignSelf: "center",
        width: "100%",
        height: "90%",
        borderBottomRightRadius: 30,
    },
    topM: {
        margin: 20,
    },
    cardTop: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
    },
    iconDel: {
        justifyContent: "center",
        paddingRight: 10,
    }
});
