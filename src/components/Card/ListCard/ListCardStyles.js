import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Dimensions.get("screen").height / 5.4,
        width: Dimensions.get("screen").width / 2.06,
        padding: 10,
        margin: 10,
        borderWidth: 0.5,
        borderColor: "white",
        backgroundColor: "black",
        borderRadius: 12,
        elevation: 20,
        shadowColor: "black",
    },
    cardName: {
        width: Dimensions.get("screen").width / 2.5,
        borderRadius: 12,
        color: "black",
        paddingLeft: 16,
        fontWeight: "bold",
        fontSize: 16,
        alignSelf: "center",
        textAlign: "center",
    },
    image: {
        width: Dimensions.get("screen").width / 2,
        height: Dimensions.get("screen").height / 5.8,
        borderRadius: 12,
    },
    iconDel: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 15,
        marginRight: 14,
    }
});
