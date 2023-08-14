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
        height: Dimensions.get("window").height / 2,
        width: Dimensions.get("window").width ,
    }
})