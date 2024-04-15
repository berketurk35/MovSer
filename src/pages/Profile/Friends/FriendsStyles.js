import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        position: "relative",
    },
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
        padding: 16,
        borderRadius: 8,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 15,
    },
    searchUser: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 12,
    },
    searchText: {
        flex: 1,
        fontSize: 14,
    },
    itemName: {
        flex: 1,
        padding: 0,
        marginTop: 15,
        alignSelf: "center",
    },
    add: {
        padding: 10,
        color: "white",
        fontSize: 10,
    },
    addBox: {
        backgroundColor: colors.primary,
        borderRadius: 14,
        marginTop: 15,
        marginHorizontal: 15,
        alignSelf: "center",
    },
    pp: {
        height: 50,
        width: 50,
        borderRadius: 100,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    status: {
        marginLeft: 30,
        marginTop: 16,
        fontSize: 14,
        color: "black"
    },
    guestInfoBox: {
        alignItems: "center",
    },
    guestInfoTitle: {
        fontSize: 16,
        paddingBottom: 10,
        color: "black"
    },
    guestInfoButton: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "white",
        marginTop: 20,
    },
    guestInfoButtonText: {
        color: "white",
        padding: 14,
    },
    userName: {
        fontSize: 14,
        paddingLeft: 20,
        color: "black",
        fontWeight: "500",
    },
    fullName: {
        fontSize: 12,
        paddingLeft: 20
    },
});
