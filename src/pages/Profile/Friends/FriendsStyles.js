import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5",
    },
    content: {
        flex: 1,
        position: "relative",
    },
    fab: {
        position: "absolute",
        margin: 12,
        right: 0,
        bottom: 0,
        backgroundColor: "#1565C0",
        borderWidth: 2,
        borderColor: "black",
        opacity: 0.8
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
        borderRadius: 16,
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white", //#FF95AB
        marginHorizontal: 30,
        marginVertical: 10,
        height: 38,
        borderRadius: 16,
        borderWidth: 0.6,
        elevation: 44,
        shadowColor: "black",
        opacity: 1,
    },
    icon: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    seperator: {
        height: 1,
        backgroundColor: "black",
    },
    seperator2: {
        height: 1,
        backgroundColor: "black",
        marginTop: 15,
    },
    searchUser: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 22,
    },
    searchText: {
        flex: 1,
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
        backgroundColor: "#1565C0",
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
        marginTop: 20,
        fontSize: 16,
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
        backgroundColor: "#1565C0",
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
