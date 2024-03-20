import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../colors/colors";

export default StyleSheet.create({
    box: {
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row",
        margin: 8,
        width: Dimensions.get("window").width / 1.4,
        backgroundColor: colors.primary,
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
        fontSize: 15,
        color: "white"
    },
    seperator: {
        borderWidth: 0.6,
        borderColor: "white",
    }
});