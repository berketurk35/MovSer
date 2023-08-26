import React, { useEffect } from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image';
import styles from "./IntroStyles";

import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ukdilyiayiqrwhbveugn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZGlseWlheWlxcndoYnZldWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NjAxMTMsImV4cCI6MjAwNzIzNjExM30.gFHaGvPtHMPp3sm8hHPG7MtV6TEQ4cve6ob9WNhvz2c";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

function Intro({ navigation }) {

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const rememberMeValue = await AsyncStorage.getItem('rememberMe');
      if (rememberMeValue === 'true') {
        const refreshToken = await AsyncStorage.getItem('token');
        if (refreshToken) {
          // Yenileme belirteci ile sessizce giriş yapın
          const { error } = await supabase.auth.getSession({ refreshToken });
          if (!error) {
            navigation.replace("TabNavigator"); 
          } else {
            navigation.replace("Login"); 
          }
        } else {
          navigation.replace("Login"); 
        }
      } else {
        navigation.replace("Login"); 
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container} >
      <FastImage source={require("../../images/logoo.gif")} resizeMode={FastImage.resizeMode.contain} style={styles.logo} />
    </View>
  )
};


export default Intro;
