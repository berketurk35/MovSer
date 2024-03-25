import { StyleSheet } from "react-native";
import { colors } from "../../colors/colors";

export default StyleSheet.create({
    body: {
        marginTop: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        color: "black",
        fontSize: 13
    },
    label: {
        fontSize: 12,
        color: "gray",
        fontWeight: "bold",
        marginBottom: 6,
    },
    box: {
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 0.6,
        borderColor: colors.primary,
        paddingHorizontal: 15,
        height: 50,
        elevation: 24,
        shadowColor: colors.primary,
    },
});
