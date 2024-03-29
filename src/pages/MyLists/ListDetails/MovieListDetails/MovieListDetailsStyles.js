import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    info: {
        textAlign: "center",
        color: "black",
        fontSize: 12,
        paddingBottom: 5,
    },
});
