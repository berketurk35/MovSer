import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
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
        fontSize: 16,
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
        borderColor: "gray",
        width: Dimensions.get("window").width /1.1,
        marginHorizontal: 10,
        marginTop: 20,
    },
    icon: {
        paddingRight: 20
    },
    icon2: {
        paddingRight: 35
    },
    iconBox: {
        alignSelf: "center",
        flexDirection: "row"
    }
});
