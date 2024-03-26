import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: 10,
    },
    image: {
        height: 60,
        width: 60,
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
        paddingLeft: 20,
        paddingTop: 2,
    },
    seperator: {
        borderWidth: 0.2,
        borderColor: "gray",
        width: Dimensions.get("window").width /1.1,
        marginHorizontal: 10,
        marginTop: 20,
    },
    icon: {
        paddingHorizontal: 10
    },
    iconBox: {
        alignSelf: "center",
    }
});
