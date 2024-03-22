import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        backgroundColor: colors.primary,
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginHorizontal: 30,
        marginVertical: 10,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 13,
    }
});
