import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121"
    },
    image: {
        height: Dimensions.get("window").height / 4,
        width: Dimensions.get("window").width / 3,
        alignSelf: "center",
        marginVertical: 20,
        borderWidth: 2,
        borderColor: "white"
    },
    body: {
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 20,
    }
});