import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 30,
    },
    image: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderRadius: 100,
    },
    textBody: {
        justifyContent: "center",
    },
    userName: {
        fontSize: 18,
        paddingLeft: 20,
        color: "black",
        fontWeight: "500",
    },
    fullName: {
        fontSize: 14,
        paddingLeft: 20
    },
    seperator: {
        borderWidth: 0.2,
        borderColor: "gray",
        width: Dimensions.get("window").width /1.1,
        marginHorizontal: 10,
        marginTop: 20,
    }
});
