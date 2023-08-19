import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
        borderWidth: 1,
        borderColor: "white"
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
        elevation: 24,
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
    itemName: {
        flex: 1,
        padding: 10,
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
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    status: {
        marginLeft: 30,
        marginTop: 20,
        fontSize: 16,
    }
});
