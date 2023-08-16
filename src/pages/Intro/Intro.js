import React, { useEffect} from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image';
import styles from "./IntroStyles";

function Intro({navigation}) {

    useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.replace('Login'); 
        }, 3000); 
        return () => clearTimeout(timeout); 
      }, [navigation]);

    return(
        <View style={styles.container} >
            <FastImage source={require("../../images/logo.gif")} resizeMode={FastImage.resizeMode.contain} style={styles.logo} />
            
        </View>
    )
};

export default Intro;