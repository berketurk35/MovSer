import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    logo: {
        height: Dimensions.get("window").height / 3.9,
        width: Dimensions.get("window").width / 2,
    },
    flagImage: {
        height: 50,
        width: 50,
    }
})