import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
    },
    friendList: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 4,
        fontWeight: 'bold',
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 16,
        padding: 10,
        fontSize: 14,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: colors.primary,
        width: Dimensions.get("window").width / 2,
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 10
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        padding: 10,
        fontWeight: "bold",
    }
});
