import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
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
        padding: 12,
        borderRadius: 8,
        height: "80%",
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 10,
    },
    friendList: {
        textAlign: 'center',
        fontSize: 15,
        paddingBottom: 4,
        fontWeight: 'bold',
        color: "black",
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 10,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
    },
});
