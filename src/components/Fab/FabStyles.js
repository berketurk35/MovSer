import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../colors/colors";

export default StyleSheet.create({
    fab: {
        flexDirection: "row",
        padding: 10,
        position: "absolute",
        margin: 12,
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "black",
        opacity: 0.9,
    },
    fabColor: {
        color: "white",
        fontWeight: "bold",
        margin: 4,
        textAlign: "center",
    },
    fabIcon: {
        margin: 2,
    },
});
