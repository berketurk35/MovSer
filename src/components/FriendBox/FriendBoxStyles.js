import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../colors/colors";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 30,
    },
    image: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 100,
    },
    textBody: {
        flex: 1,
        justifyContent: "center",
    },
    userName: {
        fontSize: 15,
        paddingLeft: 20,
        color: "black",
        fontWeight: "500",
    },
    fullName: {
        fontSize: 12,
        paddingLeft: 20
    },
    seperator: {
        borderWidth: 0.2,
        borderColor: colors.primary,
        marginHorizontal: 30,
        marginTop: 10,
    },
    icon: {
        paddingTop: 10,
        paddingRight: 20
    },
    icon2: {
        paddingTop: 10,
        paddingRight: 35
    },
    iconBox: {
        alignSelf: "center",
        flexDirection: "row"
    }
});
