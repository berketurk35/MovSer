import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    body: {
        flexDirection: "column",
        marginTop: 15,
    },    
    textInput: {
        paddingLeft: 10,
    },
    label: {
        fontSize: 14,
        color: "gray",
        marginBottom: 6,
    },
    inputBox: {
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 0.1,
        //borderColor: "5D5FEE",
        alignItems: "center",
        paddingHorizontal: 15,
        height: 50,
        elevation: 24,
        shadowColor: "blue",
    },
    icon: {
        position: "absolute",
        right: 0,
        paddingRight: 15,
    }
    
})