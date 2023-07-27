import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        height: 150,
        
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    miniImg:{
        height: 35,
        width: 70,
        margin: 5,
    },
    image: {
        flex: 1,
    },
    bodyRow: {
        flexDirection: "row",
        alignSelf: "center"
    },
    text: {
        fontSize: 14,
        color: "black",
        padding: 10,
    }
});
