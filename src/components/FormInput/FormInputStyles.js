import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    box: {
        flexDirection: "row",
        borderWidth: 0.8,
        borderRadius: 16,
        width: Dimensions.get("window").width / 1.4,
        margin: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    input: {
        flex: 1,
    },
    icon: {
        paddingHorizontal: 10
    },
});
