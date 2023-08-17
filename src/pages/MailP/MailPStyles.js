import { StyleSheet, Dimensions } from "react-native";

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
        backgroundColor: "#1565C0",
        width: Dimensions.get("window").width / 1.6,
        borderRadius: 14,
        marginTop: 10,
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
        height: Dimensions.get("window").height / 6,
        width: Dimensions.get("window").width / 3,
        marginBottom: 40,
    },
    check: {
        flexDirection: "row",
        alignItems: "center",   
    },
    checkIcon: {
        paddingRight: 5,
    },
    touchbox: {
        flexDirection: "row",
        alignItems: "center",
        width: Dimensions.get("window").width / 1.5,
        justifyContent: "flex-end"
    },
    forget: {
        paddingTop: 10,
    }
})