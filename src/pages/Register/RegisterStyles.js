import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
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
    icon2: {
        paddingRight: 5,
    },
    button: {
        backgroundColor: colors.primary,
        width: Dimensions.get("window").width / 1.6,
        borderRadius: 12,
        marginTop: 5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        padding: 10,
    },
    underText: {
        marginTop: 15,
        flexDirection: "row"
    },
    logo: {
        height: Dimensions.get("window").height / 10,
        width: Dimensions.get("window").width / 5,
        marginBottom: 10,
    },
    or: {
        margin: 5,
        color: "black",
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
    }
})