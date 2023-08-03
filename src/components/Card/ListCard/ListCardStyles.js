import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 160,
        width: 200,
        padding: 10,
        margin: 10,
        borderWidth: 0.5,
        borderColor: "white",
        backgroundColor: "black",
        borderRadius: 12,
        elevation: 40,
        shadowColor: "black"
    },
    cardName: {
        width: Dimensions.get("screen").width / 3,
        height: 40,
        borderRadius: 12,
        color: "black",
        paddingLeft: 16,
        fontWeight: "bold",
        fontSize: 16,
        alignSelf: "center",
        backgroundColor: "#dce2e5"
    },
    image: {
        width: Dimensions.get("screen").width / 2,
        height: 149,
        borderRadius: 12,
    },
    iconDel: {
        //backgroundColor: "gray"
    }
});
