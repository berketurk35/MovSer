import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    box: {
        borderWidth: 1,
        borderRadius: 16,
        flexDirection: "row",
        margin: 10,
        width: Dimensions.get("window").width / 1.4,
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
        fontWeight: "600",
        fontSize: 16,
        color: "black"
    },
    seperator: {
        height: 40 ,
        borderWidth: 0.5,
    }
});