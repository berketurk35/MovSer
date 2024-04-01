import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBox: {
        padding: 3,
        marginHorizontal: 40,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.primary,
        borderRadius: 12,
        elevation: 10,
        shadowColor: "black",
    },
    card: {
        height: Dimensions.get("screen").height / 5.6,
        borderRadius: 12,
        overflow: "hidden",
    },
    cardName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        backgroundColor: colors.background,
        opacity: 0.8,
        paddingRight: 60,
        paddingBottom: 3
    },
    cardMessageTitle: {
        paddingLeft: 6,
        paddingTop: 6,
        color: "black",
        fontSize: 12,
        fontWeight: "bold",
        backgroundColor: colors.background,
        opacity: 0.8,
    },
    cardMessage: {
        flex: 1,
        paddingHorizontal: 6,
        paddingTop: 2,
        fontSize: 11,
        color: "black",
        fontWeight: "bold",
        backgroundColor: colors.background,
        opacity: 0.8,
    },
    fullName: {
        textAlign: "right",
        paddingRight: 12,
        paddingBottom: 4,
        color: "black",
        fontSize: 13,
        fontWeight: "bold",
        backgroundColor: colors.background,
        opacity: 0.8,
    },
    typeBox: {
        backgroundColor: colors.primary,
        alignItems: "center",
        position: "absolute",
        right: 0,
        borderBottomLeftRadius: 12,
    },
    typeText: {
        paddingHorizontal: 10,
        paddingBottom: 4,
        color: "white"
    },
    separator: {
        height: 1,
        backgroundColor: colors.primary,
        opacity: 0.8,
    },
});