import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../colors/colors";

export default StyleSheet.create({
    customHeader: {
        backgroundColor: colors.primary,
        height: Dimensions.get("window").height / 14,
        flexDirection: "row",
        alignItems: "center",
    },
    headerTextContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    backIcon: {
        paddingLeft: 12,
    },
});
